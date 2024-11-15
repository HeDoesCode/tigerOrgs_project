<?php

namespace App\Jobs;

use App\Models\DataExtractionTools;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class DataExtraction implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */

    private $input;

    public function __construct($input)
    {
        $this->input = $input;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $result = DataExtractionTools::parseInput($this->input)
                ->tokenize()
                ->lemmatize()
                ->removeStopWords()
                ->removeSpecialChar()
                ->NER();
                
        logger($result);
    }
}
