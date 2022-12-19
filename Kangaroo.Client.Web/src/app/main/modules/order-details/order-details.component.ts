import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CanLeaveCurrentDeliveryProcess} from "../../models/can-leave-current-delivery-process/can-leave-current-delivery-process";
import {Observable} from "rxjs";
import {Order} from "../../models/order/order";
import {OrderService} from "../../services/order.service";
import {first} from "rxjs/operators";
import {CanLeavePageNotificationComponent} from "../../../shared/components/can-leave-page-notification/can-leave-page-notification.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, CanLeaveCurrentDeliveryProcess {

  canLeaveThisComponent = false;
  productCategory: any;
  product: any;
  quantity: any;
  pickUp: any;
  dropOff: any;
  coupon: any;
  deliveryType: any;

  loading: boolean = false;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productCategory = localStorage.getItem('category');
    this.product = localStorage.getItem('item');
    this.quantity = localStorage.getItem('quantity');
    this.pickUp = localStorage.getItem('pickUp');
    this.dropOff = localStorage.getItem('dropOff');
    this.coupon = localStorage.getItem('coupon');
    this.deliveryType = localStorage.getItem('deliveryType');

    if (!this.pickUp || !this.dropOff) {
      this.canLeaveThisComponent = true;
      this.router.navigate(['/home']);
    }

    if (this.pickUp == this.dropOff) {
      this.canLeaveThisComponent = true;
      this.router.navigate(['/home']);
    }

    this.productCategory = JSON.parse(this.productCategory);
    this.product = JSON.parse(this.product);
    this.quantity = JSON.parse(this.quantity);
    // this.pickUp = JSON.parse(this.pickUp);
    // this.dropOff = JSON.parse(this.dropOff);
    this.coupon = JSON.parse(this.coupon);
    this.deliveryType = JSON.parse(this.deliveryType);
  }

  async submit(form: any) {
    this.loading = true;
    this.canLeaveThisComponent = true;
    //Json Build Up
    let order: Order = this.orderService.order.getValue();
    order.note = form.value.note;
    order.deliveryDetail = {
      ...order.deliveryDetail,
      'customerFirstName': form.value.firstName,
      'customerLastName': form.value.lastName,
      'customerEmail': form.value.email,
      'customerPhoneNumber': form.value.phoneNumber
    };

    order.details = order.details?.map(detail => {
      return {
        ...detail,
        deliverToFirstName: form.value.receiverName,
        deliverToPhoneNumber: form.value.receiverPhoneNumber,
        note: form.value.note
      }
    });

    this.orderService.setOrder(order);
    // End Json Build Up

    this.orderService.createOrder(order)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          localStorage.setItem('orderResponse', JSON.stringify(response));
          this.loading = false;
          this.router.navigate(['/payments']);
        } else {
          this.loading = false;
          console.log(response);
        }

      },error => {
        this.loading = false;
        console.log(error);
      });
  }

  canLeave(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canLeaveThisComponent;
  }

}
