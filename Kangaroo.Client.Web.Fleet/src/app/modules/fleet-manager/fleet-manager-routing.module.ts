import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAllDriverComponent } from './components/view-all-driver/view-all-driver.component';
import { ViewAllVehiclesComponent } from './components/view-all-vehicles/view-all-vehicles.component';
import { ViewAllComponent } from './components/view-all/view-all.component';

const routes: Routes = [
  {
    path: '',
    component: ViewAllComponent
  },
  {
    path: 'drivers',
    component: ViewAllDriverComponent
  },
  {
    path: 'vehicles',
    component: ViewAllVehiclesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetManagerRoutingModule { }
