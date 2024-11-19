<?php

namespace App\Jobs;

use Illuminate\Bus\Batchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SimilarityComputation implements ShouldQueue
{
    use Batchable, Queueable;

    private $number;

    /**
     * Create a new job instance.
     */
    public function __construct($number)
    {
        $this->number = $number;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        logger("From similarity computation: ". $this->number);
    }
}
