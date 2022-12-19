import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-delivery-orders',
  templateUrl: './multiple-delivery-orders.component.html',
  styleUrls: ['./multiple-delivery-orders.component.scss']
})
export class MultipleDeliveryOrdersComponent implements OnInit {
  columns = ['Checkbox', 'Tracking ID.', 'Category', 'RidersName', 'PickUp', 'Dropoff', 'Status'];
  dataSource = [
    {
      trackingID: 1,
      category: 'Fashion',
      riderName: 'John Doe',
      pickup: new Date(),
      dropOff: 'Lagos',
      status: 'Processing'
    },
    {
      trackingID: 1,
      category: 'Fashion',
      riderName: 'John Doe',
      pickup: new Date(),
      dropOff: 'Lagos',
      status: 'Pending'
    },
    {
      trackingID: 1,
      category: 'Fashion',
      riderName: 'John Doe',
      pickup: new Date(),
      dropOff: 'Lagos',
      status: 'Processing'
    },
    {
      trackingID: 1,
      category: 'Fashion',
      riderName: 'John Doe',
      pickup: new Date(),
      dropOff: 'Lagos',
      status: 'Completed'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
