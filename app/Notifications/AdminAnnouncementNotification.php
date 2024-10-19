<?php

namespace App\Notifications;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminAnnouncementNotification extends Notification implements ShouldQueue, ShouldBroadcast
{
    use Queueable;

    protected $orgID;
    protected $message;

    /**
     * Create a new notification instance.
     */
    public function __construct(Organization $orgID, $message)
    {
        $this->orgID = $orgID;
        $this->message = $message;
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
            'org_logo' => $this->orgID->logo, 
            'org_name' => $this->orgID->name,
            'message' => $this->message,
        ];
    }
    /**
     * Get the broadcastable version of the notification.
     *
     * @return BroadcastMessage
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'org_logo' => $this->orgID->logo, 
            'org_name' => $this->orgID->name,
            'message' => $this->message,
        ]);
    }
    /**
     * Specify the channels for broadcasting.
     *
     * @return array<string>
     */
    public function broadcastOn()
{
    return new PrivateChannel("App.Models.User.{$notifiable->id}");
}

}
