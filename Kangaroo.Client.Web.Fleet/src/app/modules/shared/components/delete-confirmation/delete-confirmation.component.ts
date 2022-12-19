import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: {
      deleteApi: Function
    },
    private readonly modalRef: MatDialogRef<DeleteConfirmationComponent>,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  confirmDelete() {
    console.log(this.data)
    this.data.deleteApi()
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.modalRef.close(true);
        } else {
          this.notificationService.publishMessage(res['message'], 'danger', 0);
        }
      }
    )
  }

  close() {
    this.modalRef.close(true);
  }

}
