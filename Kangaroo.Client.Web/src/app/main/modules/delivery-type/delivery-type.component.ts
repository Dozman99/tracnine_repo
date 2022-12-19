import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CanLeaveCurrentDeliveryProcess} from "../../models/can-leave-current-delivery-process/can-leave-current-delivery-process";
import {Observable} from "rxjs";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order/order";
import {MatDialog} from "@angular/material/dialog";
import {CanLeavePageNotificationComponent} from "../../../shared/components/can-leave-page-notification/can-leave-page-notification.component";
import { DeliveryCalculatorService } from 'src/app/core/data/delivery-calculator/delivery-calculator.service';

@Component({
  selector: 'app-delivery-type',
  templateUrl: './delivery-type.component.html',
  styleUrls: ['./delivery-type.component.scss']
})
export class DeliveryTypeComponent implements OnInit, CanLeaveCurrentDeliveryProcess {
  delivery: any
  canLeaveThisComponent = false;
  deliveryPrices: any;
  pickUp: any;
  dropOff: any;
  couponCode = '';

  constructor(
    private router: Router,
    private orderService: OrderService,
    private matDialog: MatDialog,
    private deliveryService: DeliveryCalculatorService
  ) { }

  ngOnInit(): void {
    this.delivery = this.deliveryService.delivery;
    this.pickUp = localStorage.getItem('pickUp');
    this.dropOff = localStorage.getItem('dropOff');
    this.deliveryPrices = localStorage.getItem('prices');
    this.deliveryPrices = JSON.parse(this.deliveryPrices);

    if (!this.pickUp || !this.dropOff && this.pickUp === this.dropOff) {
      this.canLeaveThisComponent = true;
      this.router.navigate(['/home']);
    }
  }

  submit (deliveryType: any) {
    this.canLeaveThisComponent = true;
    localStorage.setItem('couponCode', this.couponCode);
    localStorage.setItem('deliveryType', JSON.stringify(deliveryType));

    //Json Build Up
    let order: Order = this.orderService.order.getValue();
    order.amount = deliveryType.price;
    order.netAmount = deliveryType.price;
    order.details = order.details?.map(detail => {
      return {
        ...detail,
        amount: deliveryType.price
      }
    });
    order.deliveryDetail = {
      ...order.deliveryDetail,
      deliveryType: 0
    }
    // deliveryType: deliveryType.deliveryOptionCode
    this.orderService.setOrder(order);
    // End Json Build Up

    this.router.navigate(['/order-details']);
  }

  canLeave(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canLeaveThisComponent;
  }
}
