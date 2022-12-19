import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICompanyLocationDetails } from 'src/app/modules/core/interfaces/company/company-location-details';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-user-and-role',
  templateUrl: './user-and-role.component.html',
  styleUrls: ['./user-and-role.component.scss']
})
export class UserAndRoleComponent implements OnInit, OnDestroy {
  columns = ['Name', 'Country', 'State', 'City', 'Status', 'Action'];
  dataSource: ICompanyLocationDetails[] = [];
  subscription$ = new Subscription();
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  companyLocationError = '';
  loadingLocations = false;

  constructor(
    private readonly settingsService: SettingsService,
    private readonly onboardService: OnboardService,
    private readonly notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.loadingLocations = true;
    this.subscription$.add(
      this.settingsService.allCompanyLocations$
        .subscribe(
          (res: any) => {
            if (res) {
              this.loadingLocations = false;
              if (res['success']) {
                this.dataSource = res['data']['items'];
                this.totalCount = res['data']['totalCount'];
              } else {
                this.companyLocationError = res['message'][0]
              }

            }
          }
        )
    )
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  changePage(event: any) {
    this.pageIndex = event;
    this.loadingLocations = true;
    this.settingsService.getAllCompanyLocation(this.pageIndex, this.pageSize);
  }

  editLocation(element: any) {
    this.onboardService.openCreateLocationCompanyModal('Edit', element.id)
      .afterClosed()
      .subscribe(
        (res: boolean) => {
          if (res) {
            this.loadingLocations = true;
            this.settingsService.getAllCompanyLocation(this.pageIndex, this.pageSize);
          }
        }
      );
  }

  addCompanyLocation() {
    this.onboardService.openCreateLocationCompanyModal('Add')
      .afterClosed()
      .subscribe(
        (res: boolean) => {
          if (res) {
            this.loadingLocations = true;
            this.settingsService.getAllCompanyLocation(this.pageIndex, this.pageSize);
          }
        }
      );
  }

  activateLocation(element: any) {
    this.settingsService.activateCompanyLocation(element.id)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            const index = this.dataSource.findIndex(item => item.id === element.id);
            element.isActive = true;
            this.dataSource.splice(index, 1, element);
            this.notificationService.publishMessage('Company location activated successfully', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }
  deactivateLocation(element: any) {
    this.settingsService.deactivateCompanyLocation(element.id)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            const index = this.dataSource.findIndex(item => item.id === element.id);
            element.isActive = false;
            this.dataSource.splice(index, 1, element);
            this.notificationService.publishMessage('Company location deactivated successfully', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }
  archiveLocation(element: any) {
    this.settingsService.archiveCompanyLocation(element.id)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            const index = this.dataSource.findIndex(item => item.id === element.id);
            element.archived = true;
            this.dataSource.splice(index, 1, element);
            this.notificationService.publishMessage('Company location archived successfully', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }
  restoreLocation(element: any) {
    this.settingsService.restoreCompanyLocation(element.id)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            const index = this.dataSource.findIndex(item => item.id === element.id);
            element.archived = false;
            this.dataSource.splice(index, 1, element);
            this.notificationService.publishMessage('Company location restored successfully', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }
  deleteLocation(element: any) {
    this.settingsService.deleteCompanyLocation(element.id)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.pageIndex = 1;
            this.loadingLocations = true;
            this.settingsService.getAllCompanyLocation(this.pageIndex, this.pageSize);

            this.deleteLocationPhone(element.id);
            this.deleteLocationEmail(element.id);
            this.deleteLocationContact(element.id);

            this.notificationService.publishMessage('Company location deleted successfully', 'success', 0);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }

  deleteLocationPhone(id: any) {
    this.subscription$.add(
      this.settingsService.searchCompanyPhoneByCompanyID$
        .subscribe(
          res => {
            if (res) {
              const companyPhone = res[0];
              this.settingsService.deleteCompanyLocationPhone(companyPhone.id)
                .subscribe(
                  (res: any) => {
                    if (res['success']) {
                      this.notificationService.publishMessage('Company location phone deleted successfully', 'success', 0);
                    } else {
                      this.notificationService.publishMessage(res['messages'], 'danger', 0);
                    }
                  }
                )
            }
          }
        )
    )
    this.settingsService.searchCompanyPhoneByCompanyID(id);
  }

  deleteLocationEmail(id: any) {
    this.subscription$.add(
      this.settingsService.searchCompanyEmailByCompanyID$
        .subscribe(
          res => {
            if (res) {
              const companyEmail = res[0];
              this.settingsService.deleteCompanyLocationEmail(companyEmail.id)
                .subscribe(
                  (res: any) => {
                    if (res['success']) {
                      this.notificationService.publishMessage('Company location email deleted successfully', 'success', 0);
                    } else {
                      this.notificationService.publishMessage(res['messages'], 'danger', 0);
                    }
                  }
                )
            }
          }
        )
    )
    this.settingsService.searchCompanyEmailByCompanyID(id);
  }

  deleteLocationContact(id: any) {
    this.subscription$.add(
      this.settingsService.searchCompanyContactByCompanyID$
        .subscribe(
          res => {
            if (res) {
              const companyContact = res[0];
              this.settingsService.deleteCompanyLocationContact(companyContact.id)
                .subscribe(
                  (res: any) => {
                    if (res['success']) {
                      this.notificationService.publishMessage('Company location contact deleted successfully', 'success', 0);
                    } else {
                      this.notificationService.publishMessage(res['messages'], 'danger', 0);
                    }
                  }
                )
            }
          }
        )
    )
    this.settingsService.searchCompanyContactByCompanyID(id);
  }

}
