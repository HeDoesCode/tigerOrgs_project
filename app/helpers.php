<?php

if (!function_exists('toast')) {
    /**
     * Generates a flash session message following the inertia shared data syntax.
     * ex: toast('Action successfully executed.', null, 'success', 5000);
     *
     * @param string $title The title for the toast notification.
     * @param string|null $description Optional description for the toast.
     * @param string $variant Optional variant of the toast (success, destructive, default = neutral).
     * @param int $duration Duration in milliseconds (default = 3000).
     * @return void
     */

    function toast($title = '', $description = '', $variant = 'neutral', $duration = 3000)
    {
        $allowedVariants = ['success', 'destructive', 'neutral'];

        if (!is_string($title)) {
            throw new InvalidArgumentException("The 'title' parameter must be a string.");
        }

        if (isset($description) && !is_string($description)) {
            throw new InvalidArgumentException("The 'description' parameter must be a string.");
        }

        if (isset($duration) && !is_int($duration)) {
            throw new InvalidArgumentException("The 'duration' parameter must be an integer.");
        }

        // Validate the variant
        if (!in_array($variant, $allowedVariants)) {
            $variant = 'neutral'; // Default to 'neutral' if invalid
        }

        session()->flash('toast', [
            'title' => $title,
            'description' => $description === '' ? null : $description, // Default description
            'variant' => $variant,
            'duration' => $duration, // Default duration is 3000ms
        ]);
    }
}
