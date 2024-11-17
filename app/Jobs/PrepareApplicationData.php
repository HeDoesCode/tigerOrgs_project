<?php

namespace App\Jobs;

use App\Models\Application;
use App\Models\DataExtractionTools;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class PrepareApplicationData implements ShouldQueue
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
        $application = Application::find($this->id);
        $layout = json_decode($application->userData)->layout;
        $userData = [];

        foreach ($layout as $inputItem) {
            if (is_object($inputItem->value)) {
                $userData[] = $inputItem->value->extracted_text;
                continue;
            }
            $userData[] = $inputItem->value;
        }

        $prepared_data = DataExtractionTools::parseInput(implode(" ", $userData))
                    ->tokenize()
                    ->lemmatize()
                    ->removeStopWords()
                    ->removeSpecialChar();

    
        $application->prepared_data = json_encode($prepared_data);
        $application->save();
    }
}
