import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateEmailComponent } from './activate-email/activate-email.component';
import { AuthenticationGuard } from './modules/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/onboard/onboard.module').then(m => m.OnboardModule)
  },
  {
    path: 'main',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'activate-account/:id',
    component: ActivateEmailComponent
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
