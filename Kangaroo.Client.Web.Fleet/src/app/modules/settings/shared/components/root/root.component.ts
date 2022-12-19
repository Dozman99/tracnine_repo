import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICompanyDetails } from 'src/app/modules/core/interfaces/company/company-details';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { SettingsService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();

  constructor(
    public readonly settingsService: SettingsService,
    private readonly notificationService: NotificationService,
    private readonly onboardService: OnboardService,
  ) { }

  ngOnInit(): void {
    this.subscription$ = this.settingsService.getCompanyById$
      .subscribe(
        res => {
          if (res) {
            this.getData();
          }
        }
      )
    this.getData();
  }

  getData() {
    this.getCompanyDetails();
    // this.getCompanyLocationDetails();
    this.getAllCompanyLocation();
    this.onboardService.getCountries();
  }

  getCompanyDetails() {
    this.settingsService.getCompanyById(environment.companyId)
      .subscribe(
        (res: any) => {
          console.log(res, 'heyyy')
          if (res['success']) {
            this.settingsService.companyDetails = res['data'];
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }

  getAllCompanyLocation() {
    this.settingsService.getAllCompanyLocation(1, 10);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
