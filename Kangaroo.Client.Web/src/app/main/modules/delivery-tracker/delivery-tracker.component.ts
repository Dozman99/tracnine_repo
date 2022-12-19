import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/main/services/order.service';
import {Order} from "../../models/order/order";
import {OrderDetail} from "../../models/order/order-detail";
import {Location} from "../../models/order/location";

@Component({
  selector: 'app-delivery-tracker',
  templateUrl: './delivery-tracker.component.html',
  styleUrls: ['./delivery-tracker.component.scss']
})
export class DeliveryTrackerComponent implements OnInit {
  showDetails = false;
  errorMessage: any;

  order!: Order;
  detail!: OrderDetail;

  locations: Location[] = [];

  loading = false;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.loading = true;
    this.orderService.trackOrder(form.value.trackingId)
    .subscribe(res => {
      console.log(res);
        if(res.success) {
          if (!(res.data.items.length > 0)) {
            this.errorMessage = "There is no delivery information at this time. Check back later.";
            this.showDetails = false;
            this.loading = false;
            return;
          }
          this.locations = res.data.items;
          this.showDetails = true;
          this.loading = false;
        } else {
          this.errorMessage = res.message;
          this.showDetails = false;
          this.loading = false;
        }
      }, error => {
        this.loading = false;
      });
  }

}
