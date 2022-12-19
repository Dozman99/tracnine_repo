import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryTrackerComponent } from './delivery-tracker.component';

export const COMPONENTS = [
  DeliveryTrackerComponent
]

const routes: Routes = [
  {
    path: '',
    component: DeliveryTrackerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryTrackerRoutingModule { }
