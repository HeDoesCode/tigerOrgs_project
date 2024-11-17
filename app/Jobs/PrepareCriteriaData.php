<?php

namespace App\Jobs;

use App\Models\Criteria;
use App\Models\DataExtractionTools;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class PrepareCriteriaData implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */

    private $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $criteria = Criteria::find($this->id);

        $prepared_data = DataExtractionTools::parseInput($criteria->description)
                    ->tokenize()
                    ->lemmatize()
                    ->removeStopWords()
                    ->removeSpecialChar();

        $criteria->prepared_data = json_encode($prepared_data);
        $criteria->save();
    }
    
}
