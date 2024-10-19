<?php

namespace App\Notifications;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MakeAdminNotification extends Notification
{
    use Queueable;

    protected $orgID;
    protected $userID;

    /**
     * Create a new notification instance.
     */
    public function __construct(Organization $orgID, User $userID)
    {
        $this->orgID = $orgID;

        $this->userID = $userID;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];    
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('You have been promoted to Admin')
            ->line('You have been promoted to Admin of the organization.')
            ->action('Go to Dashboard', url('/invite'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            // 'userID' => $this->userID->userID, 
            // 'user_name' => $this->userID->firstname . ' ' . $this->userID->lastname, 
            
            'orgID' => $this->orgID->orgID, 
            'org_logo' => $this->orgID->logo, 
            'org_name' => $this->orgID->name,
            'message' => "You have been assigned as Admin on ". $this->orgID->name . ".", 
        ];
    }
}
