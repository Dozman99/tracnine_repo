import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { State, City, Country } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city/dist/lib/interface';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FleetService } from 'src/app/modules/fleet-manager/services/fleet.service';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  editType: number = 0;
  companyDetailsFormOne: FormGroup;
  companyDetailsFormTwo: FormGroup;
  uploadedLogoFile: any;
  uploadedBannerFile: any;
  tokenDetails: any;
  companyDetails = '';
  loading = false;

  listOfCountries: ICountry[] = [];
  country: ICountry | undefined;
  selectedCountry: ICountry | undefined;
  dropdownSettings: IDropdownSettings = {};
  selectedState: IState | undefined;
  listOfStates: IState[] = [];
  listOfCity: ICity[] = [];
  selectedCity: ICity | undefined;
  subscription$ = new Subscription()

  constructor(
    private readonly fb: FormBuilder,
    private readonly storage: AngularFireStorage,
    private readonly settingsService: SettingsService,
    private readonly matDialogRef: MatDialogRef<EditCompanyComponent>,
    private readonly notificationService: NotificationService,
    private readonly onboardService: OnboardService,
    private readonly fleetService: FleetService,
    @Inject(MAT_DIALOG_DATA) public readonly data: { actionType: string, id: string },
  ) {
    const token = localStorage.getItem('access_token') || '';
    this.tokenDetails = new JwtHelperService().decodeToken(token);
    // console.log(this.tokenDetails);
    console.log(this.settingsService.companyDetails);


    this.companyDetailsFormOne = this.fb.group({
      shortName: [this.settingsService.companyDetails.shortName, Validators.required],
      acronym: [this.settingsService.companyDetails.acronym],
      email: [this.settingsService.companyDetails.email, Validators.required],
      website: [this.settingsService.companyDetails.website],
      description: [this.settingsService.companyDetails.description],
      type: [settingsService.companyDetails.type, Validators.required]
    })
    this.companyDetailsFormTwo = this.fb.group({
      rcNumber: [this.settingsService.companyDetails.rcNumber, Validators.required],
      tin: [this.settingsService.companyDetails.tin, Validators.required],
      tinRegisteredName: [this.settingsService.companyDetails.tinRegisteredName, Validators.required],
      industryId: [this.settingsService.companyDetails.industryId, Validators.required],
      brief: [this.settingsService.companyDetails.brief]
    })
   }

  ngOnInit(): void {
    this.listOfCountries = Country.getAllCountries();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'isoCode',
      textField: 'name',
      allowSearchFilter: true
    };
  }

  selectEditType(value: number) {
    this.uploadedBannerFile = undefined;
    this.uploadedLogoFile = undefined;
    this.editType = value;
  }

  uploadFile(event: any) {
    switch(this.editType) {
      case 1:
        this.uploadedBannerFile = event.target.files[0];
        break;
      case 2:
        this.uploadedLogoFile = event.target.files[0];
        break;
    }
    // this.uploadedLogoFile = event.target.files[0];
  }

  saveLogoFile() {
    this.loading = true;
    let downloadURL;
    const n = Date.now();
    const filePath = `companyLogo/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`companyLogo/${n}`, this.uploadedLogoFile);
    task
    .snapshotChanges()
      .subscribe((res) => {
          downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              const body = {url};
              this.settingsService.updateCompanyLogo(environment.companyId, body)
              .subscribe(
                (res: any) => {
                  if(res['success']) {
                    this.loading = false;
                    this.matDialogRef.close(true);
                    this.notificationService.publishMessage('Company logo updated successfully', 'success', 0);
                    // this.createCompanyLocation();
                  } else {
                    this.loading = false;
                    this.notificationService.publishMessage(res['messages'], 'danger', 0);
                  }
                }
              )
            } else {
              this.loading = false;
            }
          });
        })

  }

  saveBannerFile() {
    this.loading = true;
    let downloadURL;
    const n = Date.now();
    const filePath = `Company/Banner/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Company/Banner/${n}`, this.uploadedBannerFile);
    task
    .snapshotChanges()
    .subscribe(
      res => {
        downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              const body = {url};
              this.settingsService.updateCompanyBanner(environment.companyId, body)
              .subscribe(
                (res: any) => {
                  if(res['success']) {
                    this.loading = false;
                    this.matDialogRef.close(true);
                    this.notificationService.publishMessage('Company banner updated successfully', 'success', 0);
                    // this.createCompanyLocation();
                  } else {
                    this.loading = false;
                    this.notificationService.publishMessage(res['messages'], 'danger', 0);
                  }
                }
              )
            } else {
              this.loading = false;
            }
          });
      }
    )
      // .pipe(
      //   finalize(() => {
      //     downloadURL = fileRef.getDownloadURL();
      //     console.log(downloadURL)
      //     downloadURL.subscribe(url => {
      //       console.log(url)
      //       if (url) {
      //         const body = {url};
      //         this.settingsService.updateCompanyBanner('', body)
      //         .subscribe(
      //           res => {
      //             console.log(res);
      //             this.matDialogRef.close();
      //           }
      //         )
      //       }
      //     });
      //   })
      // )

  }

  updateCompany() {
    this.loading = true;
    const data = {
      ...this.companyDetailsFormOne.value,
      ...this.companyDetailsFormTwo.value,
    }
    this.settingsService.updateCompany(environment.companyId, data)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.loading = false;
          this.matDialogRef.close(true);
          this.notificationService.publishMessage('Company updated successfully', 'success', 0);
          // this.createCompanyLocation();
        } else {
          this.loading = false;
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  get emailRegex() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }

}
