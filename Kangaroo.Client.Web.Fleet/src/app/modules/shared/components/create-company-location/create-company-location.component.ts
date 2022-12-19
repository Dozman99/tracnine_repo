import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { ICity, ICountry, ILga, IState } from 'src/app/modules/onboard/models/country-state-city-lga';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { SettingsService } from 'src/app/modules/settings/services/settings/settings.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-create-company-location',
  templateUrl: './create-company-location.component.html',
  styleUrls: ['./create-company-location.component.scss']
})
export class CreateCompanyLocationComponent implements OnInit, OnDestroy {
  loading = false;
  listOfCountries: ICountry[] = [];
  selectedCountry: any;
  dropdownSettings: IDropdownSettings = {};
  selectedState: any;
  listOfStates: IState[] = [];
  listOfCity: ICity[] = [];
  listOfLga: ILga[] = [];
  selectedCity: any;
  selectedLga: any;
  uploadedPhoto: any;
  companyLocationCreated: EventEmitter<boolean> = new EventEmitter<any>();
  subscription$ = new Subscription();
  companyLocation: any;
  companyContact: any;
  companyPhone: any;
  companyEmail: any;
  
  existingCountry: ICountry[] = [];
  existingState: IState[] = [];
  existingCity: ICity[] = [];
  existingLga: ILga[] = []
  
  companyLocationForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    address1: ['', Validators.required],
    address2: ['', Validators.required],
    postalCode: ['', Validators.required],
    narration: ['', Validators.required],
  })

  companyLocationContactForm: FormGroup = this.fb.group({
      surname: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      alternateEmail: [''],
      phone1: ['', Validators.required],
      phone2: [''],
      isPrimary: [false, Validators.required]
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly settingsService: SettingsService,
    private readonly notificationService: NotificationService,
    private readonly onboardService: OnboardService,
    private readonly storage: AngularFireStorage,
    private readonly matDialogRef: MatDialogRef<CreateCompanyLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: {action: string, id: string}
  ) { }
  
  ngOnInit(): void {

    if (this.data.action === 'Edit') {
      this.subscription$.add(
        this.settingsService.getCompanyLocationById$.subscribe(
        res => {
          if(res) {
            console.log(res, 'jjjj')
            this.companyLocation = res;
            this.companyLocationForm.patchValue({
              name: this.companyLocation.name,
              address1: this.companyLocation.address1,
              address2: this.companyLocation.address2,
              postalCode: this.companyLocation.postalCode,
              narration: this.companyLocation.narration,
            })

          this.listOfCountries.forEach(
            (country) => {
              if (country.id === this.companyLocation.countryId) {
                this.existingCountry = [country];
                this.selectedCountry = this.companyLocation.countryId;
                this.listOfStates = country.states;
                this.listOfCity = country.cities;
                this.listOfLga = country.lgas;
                this.dropdownSettings = {
                  singleSelection: true,
                  idField: 'id',
                  textField: 'description',
                  allowSearchFilter: true
                };


                this.listOfStates.forEach(
                  (state) => {
                    if (state.id === this.companyLocation.stateId) {
                      this.existingState = [state];
                      this.selectedState = this.companyLocation.stateId;
                      this.dropdownSettings = {
                        singleSelection: true,
                        idField: 'id',
                        textField: 'description',
                        allowSearchFilter: true
                      };
                    }
                  }
                )

                this.listOfCity.forEach(
                  (city) => {
                    if (city.id === this.companyLocation.cityId) {
                      this.existingCity = [city];
                      this.selectedCity = this.companyLocation.cityId;
                      this.dropdownSettings = {
                        singleSelection: true,
                        idField: 'id',
                        textField: 'description',
                        allowSearchFilter: true
                      };
                    }
                  }
                )

                this.listOfLga.forEach(
                  (lga) => {
                    if (lga.id === this.companyLocation.lgaId) {
                      this.existingLga = [lga];
                      this.selectedLga = this.companyLocation.lgaId;
                      this.dropdownSettings = {
                        singleSelection: true,
                        idField: 'id',
                        textField: 'description',
                        allowSearchFilter: true
                      };
                    }
                  }
                )
              }
            }
          )
          }
        }
      ))
      this.subscription$.add(
        this.settingsService.searchCompanyContactByCompanyID$
        .subscribe(
          (res) => {
            if(res) {
              this.companyContact = res[0];
              this.companyLocationContactForm.patchValue({
                surname: this.companyContact.surname,
                firstName: this.companyContact.firstName,
                email: this.companyContact.email,
                alternateEmail: this.companyContact.alternateEmail,
                phone1: this.companyContact.phone1,
                phone2: this.companyContact.phone2,
                isPrimary: this.companyContact.isPrimary
            })
            }
          }
        )
      )
      this.subscription$.add(
        this.settingsService.searchCompanyPhoneByCompanyID$
        .subscribe(
          res => {
            if(res) {
              this.companyPhone = res[0];
            }
          }
        )
      )
      this.subscription$.add(
        this.settingsService.searchCompanyEmailByCompanyID$
        .subscribe(
          res => {
            if(res) {
              this.companyEmail = res[0];
            }
          }
        )
      )
      this.getCompanyLocation();
      this.getCompanyContact();
      this.getCompanyPhone();
      this.getCompanyEmail();
    }

    this.companyLocationForm = this.fb.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      postalCode: ['', Validators.required],
      narration: ['', Validators.required],
    })
    this.getData();
  }

  getCompanyLocation() {
    this.settingsService.getCompanyLocation(this.data.id);
  }

  getData() {
    this.getAllCountries();
    this.getTitles();
  }

  getTitles() {
    this.onboardService.getTitles()
    .subscribe(
      (res: any) => {
        console.log(res)
      }
    )
  }

  getCompanyContact() {
    this.settingsService.searchCompanyContactByCompanyID(this.data.id);
  }

  getCompanyPhone() {
    this.settingsService.searchCompanyPhoneByCompanyID(this.data.id);
  }
  getCompanyEmail() {
    this.settingsService.searchCompanyEmailByCompanyID(this.data.id);
  }

  onCountrySelect(event: any) {
    this.selectedState = undefined;
    this.selectedCountry = event.id;
    this.getStateByCountryId(event.id);
  }

  onCountryDeselect(event: any) {
    this.selectedCountry = undefined;
    this.selectedState = undefined;
    this.selectedLga = undefined;
    this.listOfStates = [];
    this.listOfLga = [];
  }

  onStateSelect(event: any) {
    this.selectedState = event.id;
    this.getCityByCountryStateId(this.selectedState);
  }

  onCitySelect(event: any) {
    this.selectedCity = event.id;
    this.getLgaByCountryStateId(this.selectedState);
  }

  onStateDeselect(event: any) {
    this.selectedState = undefined;
    this.selectedCity = undefined;
    this.selectedLga = undefined;
    this.listOfCity = [];
    this.listOfLga = [];
  }

  onLgaSelect(event: any) {
    this.selectedLga = event.id;
  }

  onCityDeselect(event: any) {
    this.selectedCity = undefined;
    this.selectedLga = undefined;
    this.listOfLga = [];
  }

  onLgaDeselect(event: any) {
    this.selectedLga = undefined;
  }

  saveCompanyLocation() {
    this.loading = true;
    this.companyLocationForm.value.countryId = this.selectedCountry;
    this.companyLocationForm.value.stateId = this.selectedState;
    this.companyLocationForm.value.cityId = this.selectedCity;
    this.companyLocationForm.value.lgaId = this.selectedLga;

    if (this.data.action === 'Add') {
      this.companyLocationForm.value.companyId = environment.companyId;
    }

    this.savePhotoFile();
  }

  createCompanyLocation() {
    
    this.settingsService.createCompanyLocation(this.companyLocationForm.value)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage('Company location created successfuly', 'success', 0);
          this.createCompanyLocationContact(res['data']['id']);
          this.createCompanyLocationEmail(res['data']['id']);
          this.createCompanyLocationPhone(res['data']['id']);
          // this.companyLocationCreated.emit(true);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  updateCompanyLocation() {
    this.loading = true;
    this.settingsService.updateCompanyLocation(this.companyLocationForm.value, this.data.id)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage('Company location updated successfuly', 'success', 0);
          this.updateCompanyLocationContact();
          this.updateCompanyLocationEmail();
          this.updateCompanyLocationPhone();
          // this.companyLocationCreated.emit(true);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  getAllCountries() {
    this.onboardService.listOfCountries$
    
    .subscribe(
      (res: any) => {
        if(res) {
          this.listOfCountries = res;
          this.dropdownSettings = {
            singleSelection: true,
            idField: 'id',
            textField: 'description',
            allowSearchFilter: true
          };
        }
      }
    )
    this.onboardService.getCountries();
  }

  getStateByCountryId(id: any) {
    this.onboardService.getStateByCountryId(id)
      .subscribe(
        (res: any) => {
          if(res['success']) {
            this.listOfStates = res['data'];
            this.dropdownSettings = {
              singleSelection: true,
              idField: 'id',
              textField: 'description',
              allowSearchFilter: true
            };
          } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
        }
      )
  }

  getCityByCountryStateId(id: any) {
    this.onboardService.getCityByCountryStateId(id)
      .subscribe(
        (res: any) => {
          if(res['success']) {
            this.listOfCity = res['data'];
            this.dropdownSettings = {
              singleSelection: true,
              idField: 'id',
              textField: 'description',
              allowSearchFilter: true
            };
          } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
        }
      )
  }
  getLgaByCountryStateId(id: any) {
    this.onboardService.getLgaByCountryStateId(id)
      .subscribe(
        (res: any) => {
          if(res['success']) {
            this.listOfLga = res['data'];
            this.dropdownSettings = {
              singleSelection: true,
              idField: 'id',
              textField: 'description',
              allowSearchFilter: true
            };
          } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
        }
      )
  }

  createCompanyLocationContact(id: any) {
    this.companyLocationContactForm.value.companyLocationId = id
    this.settingsService.createCompanyLocationContact(this.companyLocationContactForm.value)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.matDialogRef.close(true);
          this.notificationService.publishMessage('Company location contact created successfully', 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  createCompanyLocationEmail(companyLocationId: any) {
    const data = {
      companyLocationId,
      "emailAddress": this.companyLocationContactForm.value.email,
      "isPrimary": this.companyLocationContactForm.value.isPrimary
    }
    this.settingsService.createCompanyLocationEmail(data)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage('Company location email created successfully', 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  createCompanyLocationPhone(companyLocationId: any) {
    const country: any = this.listOfCountries.find((country: any) => country.id === this.selectedCountry);
    const data = {
      companyLocationId,
      "countryCode": country.countryCode,
      "phoneNumber": this.companyLocationContactForm.value.phone1,
      "isMobile": true,
      "isPrimary": this.companyLocationContactForm.value.isPrimary
    }
    this.settingsService.createCompanyLocationPhone(data)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage('Company location phone created successfully', 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  updateCompanyLocationContact() {
    this.settingsService.updateCompanyLocationContact(this.companyLocationContactForm.value, this.companyContact.id)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.matDialogRef.close(true);
          this.notificationService.publishMessage('Company location contact updated successfully', 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  updateCompanyLocationEmail() {
    const data = {
      "emailAddress": this.companyLocationContactForm.value.email,
      "isPrimary": this.companyLocationContactForm.value.isPrimary
    }
    this.settingsService.updateCompanyLocationEmail(data, this.companyEmail.id)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage('Company location email updated successfully', 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  updateCompanyLocationPhone() {
    const country: any = this.listOfCountries.find((country: any) => country.id === this.selectedCountry);
    const data = {
      "countryCode": country.countryCode,
      "phoneNumber": this.companyLocationContactForm.value.phone1,
      "isMobile": true,
      "isPrimary": this.companyLocationContactForm.value.isPrimary
    }
    this.settingsService.updateCompanyLocationPhone(data, this.companyPhone.id)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.notificationService.publishMessage('Company location phone updated successfully', 'success', 0);
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }
      }
    )
  }

  uploadFile(event: any) {
    this.uploadedPhoto = event.target.files[0];
    // this.uploadedPhoto = event.target.files[0];
  }

  savePhotoFile() {
    if(this.uploadedPhoto) {
      let downloadURL;
    const n = Date.now();
    const filePath = `companyLocationContactPhoto/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`companyLocationContactPhoto/${n}`, this.uploadedPhoto);
    task
    .snapshotChanges()
      .subscribe((res) => {
          downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              this.companyLocationContactForm.value.photoUrl = url;
              if(this.data.action === 'Add') {
                this.createCompanyLocation();
              } else {
                this.updateCompanyLocation();
              }
            }
          });
        })
    } else {
      this.companyLocationContactForm.value.photoUrl = this.companyContact.photoUrl;
      this.updateCompanyLocation();
    }

  }

  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }

  get emailRegex() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }

}
