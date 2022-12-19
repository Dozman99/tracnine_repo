import { Component, OnInit } from '@angular/core';
import {MonnifyService} from "../../../services/monnify.service";
import {Order} from "../../../models/order/order";
import {OrderService} from "../../../services/order.service";
import {OrderDetail} from "../../../models/order/order-detail";
import {Router} from "@angular/router";
import {CanLeaveCurrentDeliveryProcess} from "../../../models/can-leave-current-delivery-process/can-leave-current-delivery-process";
import {CanLeavePageNotificationComponent} from "../../../../shared/components/can-leave-page-notification/can-leave-page-notification.component";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {PaymentService} from "../../../services/payment.service";
declare let monnify: any;
@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit, CanLeaveCurrentDeliveryProcess {

  canLeaveThisComponent = false;

  loading = false;

  paymentAvailable = false;
  order: Order = {};
  orderDetail: OrderDetail = {};

  pickUp: string | null = '';
  dropOff: string | null = '';
  category: string | null = '';
  type: string | null = '';

  orderResponse!: any;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private monnifyService: MonnifyService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.order = this.orderService.order.getValue();
    this.pickUp = localStorage.getItem('pickUp');
    this.dropOff = localStorage.getItem('dropOff');
    this.category = localStorage.getItem('productCategory');
    this.type = localStorage.getItem('type');
    // @ts-ignore
    this.orderResponse = JSON.parse(localStorage.getItem('orderResponse') );

    // @ts-ignore
    this.orderDetail = this.order.details[0];

    if (!this.pickUp || !this.dropOff) {
      this.canLeaveThisComponent = true;
      this.router.navigate(['/home']);
    }

    this.monnifyService.paymentAvailable.subscribe(value => {
      this.paymentAvailable = value;
    });
  }

  makePayment (): void {
    this.canLeaveThisComponent = true;
    // @ts-ignore
    window.MonnifySDK.initialize({
      amount: this.order.netAmount,
      currency: "NGN",
      reference: '' + Math.floor((Math.random() * 1000000000) + 1),
      customerName: `${this.order.deliveryDetail?.customerFirstName} ${this.order.deliveryDetail?.customerLastName}`,
      // customerEmail: this.order.deliveryDetail?.customerEmail,
      customerEmail: 'payment@tracnine.com',
      apiKey: "MK_TEST_M9ACN267VU",
      contractCode: "9739262979",
      paymentDescription: "Payment for delivery",
      isTestMode: true,
      metadata: {
        XRef: `ORDER_${this.orderResponse.data.id}`
      },
      paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
      onComplete: function(response: any) {
        console.log("onComplete Data", response);
        // localStorage.setItem('payment object', JSON.stringify(response));
        //Implement what happens when transaction is completed.

       /** if (response.paymentStatus === 'FAILED') {
          console.log("OnComplete Fails", response)
          alert(response.message);
          localStorage.setItem('payment failure', JSON.stringify(response));
        }

        if (response.responseBody.status === 'FAILED') {
          console.log("OnComplete Failed", response)
          alert(response.responseBody.message);
          localStorage.setItem('payment failure', JSON.stringify(response));
        }  */

        if (response.status === 'FAILED') {
          console.log("OnComplete Fails", response)
          alert(response.responseBody.message);
          localStorage.setItem('payment failure', JSON.stringify(response));
        }

        if (response.paymentStatus === 'PAID' || response.status ==='SUCCESS') {
          console.log("OnComplete", response)
          localStorage.setItem('payment', JSON.stringify(response));
          // this.router.navigate(['/order-completed']);
          window.location.replace('order-completed');
        }
      },
      onClose: function(data: any) {
        this.loading = false;
        console.log("OnClose Data", data);
        //Implement what should happen when the modal is closed here
        if (data.paymentStatus == 'USER_CANCELLED' && data.responseCode == 'USER_CANCELLED') {
          alert("User Cancelled Payment Process");
          this.loading = false;
        }

        if (data.requestSuccessful == true && data.responseBody.status == 'SUCCESS' && data.responseBody.message == 'Transaction Successful') {
          console.log("onClose", data);
          localStorage.setItem('payment-variables', JSON.stringify(data));
          this.router.navigate(['/order-completed']);
        }
      }
    });
  }

  savePayment () {
    this.loading = true;
    const orderResponse = JSON.parse(localStorage.getItem('orderResponse') || '');
    let payload = {
      "customerName": orderResponse.data.deliveryDetail.customerFirstName + " " + orderResponse.data.deliveryDetail.customerLastName,
      "customerEmail": orderResponse.data.deliveryDetail.customerEmail,
      "entityRecordType": "ORDER",
      "entityRecordId": orderResponse.data.id,
      "amount": orderResponse.data.netAmount,
      "currency": "NGN",
      "paymentMethod": "PAYMT_MTHD_CARD",
      "paymentGateway": "PAYMT_GTWY_MONNIFY",
      "paymentBy": orderResponse.data.deliveryDetail.customerEmail,
      "narration": orderResponse.data.note
    }
    this.paymentService.savePayment(payload)
      .subscribe(data => {
        console.log(data);
        this.makePayment();
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  canLeave(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canLeaveThisComponent;
  }
}
