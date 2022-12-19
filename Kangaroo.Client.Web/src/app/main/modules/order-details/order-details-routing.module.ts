import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details.component';
import {CanProceedNextGuard} from "../../guards/can-proceed-next.guard";

export const COMPONENTS = [
  OrderDetailsComponent
]

const routes: Routes = [
  {
    path: '',
    component: OrderDetailsComponent,
    canDeactivate: [CanProceedNextGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailsRoutingModule { }
