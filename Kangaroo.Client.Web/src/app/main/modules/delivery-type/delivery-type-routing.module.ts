import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryTypeComponent } from './delivery-type.component';
import {CanProceedNextGuard} from "../../guards/can-proceed-next.guard";

export const COMPONENTS = [
  DeliveryTypeComponent
]

const routes: Routes = [
  { path: '', component: DeliveryTypeComponent, canDeactivate: [CanProceedNextGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryTypeRoutingModule { }
