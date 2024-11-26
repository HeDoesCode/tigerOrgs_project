<?php

namespace App\Jobs;

use App\Models\Application;
use App\Models\Criteria;
use App\Models\Form;
use Illuminate\Bus\Batch;
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

        $batch = Bus::batch([])
            ->finally(function(Batch $batch) {
                $vectorizedData = [];
                $jobs = [];
                $counter = 0;
                
                while (true) {
                    $key = $batch->id."_VectorizedApplication_".$counter;
                    $cachedData = Cache::pull($key);

                    if (is_null($cachedData)) {
                        break;
                    }

                    $vectorizedData[] = $cachedData;
                    $counter++;
                }

                for ($i = 0; $i < (count($vectorizedData)-1); $i++) {
                    $jobs[] = new SimilarityComputation($vectorizedData[$i], $vectorizedData[count($vectorizedData)-1]);
                }

                Bus::batch($jobs)
                    ->finally(function() {
                        
                        session()->flash('toast', [
                            'title' => 'Categorize Applications is now complete!',
                            'variant' => 'success'
                        ]);
                        
                        logger("All jobs is done now");
                    })->dispatch();
            })->dispatch();
        
        $criteria = $form->criteria;
        $applicationData = []; 
        $jobs = [];

        // create jobs for appplications
        foreach ($form->applications as $index => $application) {
            $jobs[] = new VectorizeData($application->applicationID, $batch->id, $index);
            $applicationData[] = json_decode($application->prepared_data, true);
        }
        
        // add and vectorize the criteria too
        $applicationData[] = json_decode($criteria->prepared_data, true);
        $jobs[] = new VectorizeData("JD", $batch->id, (count($applicationData)-1), $criteria->criteriaID);
        
        // build the corpus
        $corpus = $this->buildCorpus($applicationData);

        // all related jobs can have access to the data
        Cache::put($batch->id."_documents", $applicationData, now()->addMinutes(30));
        Cache::put($batch->id."_corpus", $corpus, now()->addMinutes(30));

        $batch->add($jobs);
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

