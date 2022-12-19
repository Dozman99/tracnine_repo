import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryCalculatorComponent } from './delivery-calculator/delivery-calculator.component';
import { LandingPageComponent } from './landing-page.component';

export const COMPONENTS = [
  LandingPageComponent,
  DeliveryCalculatorComponent
]

const routes: Routes = [
  { path: '', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
