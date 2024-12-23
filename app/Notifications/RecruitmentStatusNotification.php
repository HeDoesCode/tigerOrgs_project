<?php

namespace App\Notifications;

use App\Models\Organization;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RecruitmentStatusNotification extends Notification
{
    use Queueable;

    protected $status;

    /**
     * Create a new notification instance.
     */
    public function __construct($status)
    {
        $this->status = $status;

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

        if($this->status === true){
            return [
                'org_logo' => "/OSA logo.png", 
                'org_name' => "Office for Student Affairs",
                'message' => "The recruitment for this year is now open. You may now open the recruitment status on your side." ,
            ];

        }else if($this->status === false){
            return [
                'org_logo' => "/OSA logo.png", 
                'org_name' => "Office for Student Affairs",
                'message' => "The recruitment for this year is now closed. All recruitment activities are now unavailable.",
            ]; 
        }
        
    }
}
