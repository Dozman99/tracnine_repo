import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { OrderManagerService } from '../../services/order-manager/order-manager.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-delete-order-confirmation',
  templateUrl: './delete-order-confirmation.component.html',
  styleUrls: ['./delete-order-confirmation.component.scss']
})
export class DeleteOrderConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: any,
    private readonly matDialogRef: MatDialogRef<DeleteOrderConfirmationComponent>,
    private readonly orderService: OrderManagerService,
    private readonly notificationService: NotificationService,
    private readonly http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  close(value = false) {
    this.matDialogRef.close(value);
  }

  performAction() {
    console.log(this.data.method)
    this.data.method(this.data.id)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage(`Order ${this.data.action}ed successfully`, 'success', 0);
          this.close(true);
        } else {
          this.notificationService.publishMessage(res['messages'], 'success', 0);
        }
      });
  }

}
