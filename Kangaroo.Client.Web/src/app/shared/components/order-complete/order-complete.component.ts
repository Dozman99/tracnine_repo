import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../../main/services/order.service";
import {Order} from "../../../main/models/order/order";
import {OrderDetail} from "../../../main/models/order/order-detail";
import {PaymentService} from "../../../main/services/payment.service";

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent implements OnInit {

  order: Order = {};
  orderDetail: OrderDetail = {};

  pickUp: string | null = '-';
  dropOff: string | null = '-';
  quantity: string | null = '-';
  type: string | null = '-';
  category: string | null = '-';
  trackingId: string = '-';
  deliveryPin: string = '-';
  deliveryType: string = '-';
  discount: string = '-';
  transactionReference: string = '-';
  totalAmount: string = '-';
  newAmount: any;

  orderResponse: any;
  paymentDetails: any;


  constructor(
    private router: Router,
    private orderService: OrderService
    ) { }

  ngOnInit(): void {
    this.order = this.orderService.order.getValue();
    // @ts-ignore
    this.orderDetail = this.order.details[0];
    this.orderResponse = JSON.parse(localStorage.getItem('orderResponse')||'');
    this.paymentDetails = JSON.parse(localStorage.getItem('payment')||'');

    this.pickUp = localStorage.getItem('pickUp');
    this.dropOff = localStorage.getItem('dropOff');
    this.quantity = localStorage.getItem('quantity');
    this.type = localStorage.getItem('type');
    this.category = localStorage.getItem('productCategory');

    this.trackingId = this.orderResponse.data.trackingId;
    this.totalAmount = this.paymentDetails.authorizedAmount;
    // this.newAmount = "₦" + this.totalAmount;
    this.deliveryType = `${this.camelToPhrase(this.orderResponse.data.deliveryDetail.deliveryOption)} (${this.camelToPhrase(this.orderResponse.data.deliveryDetail.deliveryType)})`;
    this.transactionReference = this.paymentDetails.transactionReference;
    // console.log(this.newAmount);
  }

  submit () {
    this.router.navigate(['/delivery-tracker']);
  }

  camelToPhrase (text: string, caps= true): string
  {
    return text.replace(/[A-Z]/g, letter => ` ${caps ? letter.toUpperCase(): letter.toLowerCase()}`);
  }
}
