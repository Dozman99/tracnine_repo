import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { OrderManagerService } from '../../services/order-manager/order-manager.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  subscription = new Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly orderService: OrderManagerService
  ) { }

  ngOnInit(): void {
    this.subscription = this.orderService.order
    .subscribe(
      res => {
        if(res['success']) {
          this.order = res['data'];
        }
      }
    )
    this.getOrderById();
  }

  getOrderById() {
    this.orderService.getItem(this.data.id);
  }

  confirmDelete() {
    this.orderService.openConfirmationModal(this.data.id, 'delete', this.orderService.deleteOrder);
  }

  confirmArchive() {
    this.orderService.openConfirmationModal(this.data.id, 'archive', this.orderService.archiveOrder);
  }

}
