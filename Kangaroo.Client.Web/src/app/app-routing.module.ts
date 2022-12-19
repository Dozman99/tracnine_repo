import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {OrderCompleteComponent} from "./shared/components/order-complete/order-complete.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  { path: 'order-completed', component: OrderCompleteComponent},
  { path: 'error-page', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
