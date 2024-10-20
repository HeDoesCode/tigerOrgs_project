<?php

namespace App\Notifications;

use App\Models\Organization;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RecruitingEnabledNotification extends Notification
{
    use Queueable;

    protected $orgID;
    protected $message;

    /**
     * Create a new notification instance.
     */
    public function __construct(Organization $orgID)
    {
        $this->orgID = $orgID;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'recruiting' => true,
            'orgID' => $this->orgID->orgID, 
            'org_logo' => $this->orgID->logo, 
            'org_name' => $this->orgID->name,
            'message' => "Your followed organization is now recruiting. Click to visit.",
        ];
    }
}
