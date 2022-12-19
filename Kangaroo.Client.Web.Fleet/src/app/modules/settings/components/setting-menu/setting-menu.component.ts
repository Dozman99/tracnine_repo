import { Component, OnInit } from '@angular/core';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';

@Component({
  selector: 'app-setting-menu',
  templateUrl: './setting-menu.component.html',
  styleUrls: ['./setting-menu.component.scss']
})
export class SettingMenuComponent implements OnInit {

  constructor(
    private readonly onboardService: OnboardService
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.onboardService.logout();
  }

}
