import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Color } from '@swimlane/ngx-charts';
import { OrderManagerService } from 'src/app/modules/order-manager/services/order-manager/order-manager.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  ordersDataSource: MatTableDataSource<any> = new MatTableDataSource();
  loadingOrders = true;
  single: any[] = [
    {
      "name": "Mon",
      "value": 94
    },
    {
      "name": "Tue",
      "value": 500
    },
    {
      "name": "Wed",
      "value": 720
    },
    {
      "name": "Thur",
      "value": 10
    },
    {
      "name": "Fri",
      "value": 10
    },
  ];
  single2: any[] = [
    {
      "name": "Mon",
      "value": 994
    },
    {
      "name": "Tue",
      "value": 700
    },
    {
      "name": "Wed",
      "value": 920
    },
    {
      "name": "Thur",
      "value": 920
    },
    {
      "name": "Fri",
      "value": 920
    },
  ];
  multi: any[] = [];

  view: [number, number] = [650, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = '';

  colorScheme: any = {
    domain: ['#fff'],
  };
  colorScheme2: any = {
    domain: ['rgba(225, 225, 225, 0.5)'],
  };

  constructor(
    private readonly orderService: OrderManagerService
  ) { 
  }

  ngOnInit(): void {
    this.orderService.orders
    .subscribe(
      res => {
        this.loadingOrders = false;
        if(res['success']) {
          this.ordersDataSource = new MatTableDataSource(res['data']['items'])
        }
      }
    )

    this.getOrders();
  }

  getOrders() {
    this.loadingOrders = true;
    this.orderService.getOrders(1, 3);
  }

  onSelect(event: any) {
    console.log(event);
  }

}
