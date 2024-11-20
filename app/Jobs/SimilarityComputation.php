<?php

namespace App\Jobs;

use App\Models\Application;
use Illuminate\Bus\Batchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use PDO;

class SimilarityComputation implements ShouldQueue
{
    use Batchable, Queueable;

    private $applicationVector;
    private $JDVector;

    /**
     * Create a new job instance.
     */
    public function __construct($applicationVector, $JDVector)
    {
        $this->applicationVector = $applicationVector;
        $this->JDVector = $JDVector;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $application = Application::find($this->applicationVector['applicationID']);
        $finalScore = 0.0;

         // Calculate the dot product of the two vectors
        $dotProduct = array_sum(array_map(fn($a, $b) => $a * $b, $this->applicationVector['vectors'], $this->JDVector['vectors']));

        // Calculate the magnitude of each vector
        $magnitudeA = sqrt(array_sum(array_map(fn($a) => $a ** 2, $this->applicationVector['vectors'])));
        $magnitudeB = sqrt(array_sum(array_map(fn($b) => $b ** 2, $this->JDVector['vectors'])));

        // Prevent division by zero
        if ($magnitudeA == 0 || $magnitudeB == 0) {
            $finalScore = 0.0;
        } else {
            $finalScore = $dotProduct / ($magnitudeA * $magnitudeB);
        }
        
        $application->similarityScore = round($finalScore * 100, 2);
        $application->save();
    }
}
