import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification: { message: string; type: string; duration: number; } | undefined;

  constructor(
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.publishMessage$.subscribe(
      res => {
        console.log(res)
        this.notification = res;
        setTimeout(
          () => {
            this.dismiss();
          },
          3000
        )
      }
    )
  }

  dismiss() {
    this.notification = undefined;
  }

}
