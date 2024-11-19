<?php

namespace App\Jobs;

use App\Models\Application;
use App\Models\Criteria;
use App\Models\Form;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Cache;

class CategorizeApplication implements ShouldQueue
{
    use Queueable;

    private $processID; // this job's id so that it can be unique in the cache table
    private $formID;
    private $vectorizedData;

    /**
     * Create a new job instance.
     */
    public function __construct($formID)
    {
        $this->processID = uniqid("", true);
        $this->formID = $formID;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {   
        $form = Form::find($this->formID);

        if (is_null($form->criteria)) {
            return; // cancel categorize job since there is no criteria defined
        }
        
        $criteria = $form->criteria;
        $applicationData = []; 
        $jobs = [];
        
        foreach ($form->applications as $index => $application) {
            $jobs[] = new VectorizeData($application->applicationID, $this->processID, $index);
            $applicationData[] = json_decode($application->prepared_data, true);
        }

        // add and vectorize the criteria too
        $applicationData[] = json_decode($criteria->prepared_data, true);
        $jobs[] = new VectorizeData("JD", $this->processID, (count($applicationData)-1), $criteria->criteriaID);
        
        // build the corpus
        $corpus = $this->buildCorpus($applicationData);

        // all related jobs can have access to the data
        Cache::put($this->processID."_documents", $applicationData);
        Cache::put($this->processID."_corpus", $corpus);

        Bus::batch($jobs)
            ->finally(function() {
                logger("All jobs are done");
            })->dispatch();

            
        // Bus::batch($jobs)
        //     ->finally(function() {
        //         Bus::batch([
        //             new SimilarityComputation($this->processID),
        //             new SimilarityComputation($this->processID),
        //             new SimilarityComputation($this->processID),
        //         ]);
        //     })
        //     ->dispatch();
    }

    private function buildCorpus($applicationData) 
    {
        $corpus = [];

        foreach ($applicationData as $application) {
            $corpus = array_merge($corpus, $application);
        }

        return array_unique($corpus);
    }
}

