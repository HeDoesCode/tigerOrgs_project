<?php

namespace App\Jobs;

use App\Models\Application;
use App\Models\Criteria;
use Exception;
use Illuminate\Bus\Batchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Cache;

class VectorizeData implements ShouldQueue
{
    use Batchable, Queueable;
    
    private $applicationID;
    private $process_id;
    private $index;
    private $criteriaID;
    private $corpus;
    private $documents;
    private $num_terms;
    private $total_terms;
    private $total_documents;

    /**
     * Create a new job instance.
     */
    public function __construct($applicationID, $process_id, $index, $criteriaID = null)
    {
        $this->applicationID = $applicationID;
        $this->process_id = $process_id;
        $this->index = $index;
        $this->criteriaID = $criteriaID;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $document = null;

        if (!is_null($this->criteriaID)){
            $document = Criteria::find($this->criteriaID);
        } else {
            $document = Application::find($this->applicationID);
        }

        $corpusKey = $this->process_id.'_corpus';
        $documentsKey = $this->process_id.'_documents';
        $this->corpus = Cache::get($corpusKey);
        $this->documents = Cache::get($documentsKey);
        $this->num_terms = array_count_values(json_decode($document['prepared_data'], true));
        $this->total_terms = count(json_decode($document['prepared_data'], true));
        $this->total_documents = count($this->documents);

        $applicationVectors = [
            "applicationID" => $this->applicationID,
            "vectors" => [],
        ];

        foreach ($this->corpus as $term) {
            $tf = $this->countTermOccurenceInDocument($term) / max(1, $this->total_terms);
            $idf = log($this->total_documents / max(1, $this->termOccurenceInDocuments($term)));
            $finalVector = $tf * $idf;
            $applicationVectors['vectors'][] = $finalVector;
        }

        Cache::put(($this->process_id."_VectorizedApplication_".$this->index), $applicationVectors);
    }

    private function countTermOccurenceInDocument($term)
    {  
        try {
            return $this->num_terms[$term];

        } catch (Exception $e) {
            return 0;
        } 
    }

    private function termOccurenceInDocuments($term)
    {
        $numOfOccurances = 0;

        foreach ($this->documents as $document)
        {
            if (!in_array($term, $document)) {
                continue;
            }
            $numOfOccurances++;
        }

        return $numOfOccurances;
    }
}
