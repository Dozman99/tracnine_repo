import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RootComponent} from "./shared/components/root/root.component";
import {AccountSettingsComponent} from "./components/account-settings/account-settings.component";
import {SecuritySettingsComponent} from "./components/security-settings/security-settings.component";

const routes: Routes = [
  {path: '', component: RootComponent, children:
      [
        {path: 'account', component: AccountSettingsComponent},
        {path: 'security', component: SecuritySettingsComponent},
        {
          redirectTo: 'account',
          pathMatch: 'full',
          path: ''
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
