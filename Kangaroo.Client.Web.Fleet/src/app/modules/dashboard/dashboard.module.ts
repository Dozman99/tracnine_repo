import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { OverviewComponent } from './components/overview/overview.component';
import {MatSelectModule} from "@angular/material/select";
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    DashboardRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatCardModule
  ]
})
export class DashboardModule { }
