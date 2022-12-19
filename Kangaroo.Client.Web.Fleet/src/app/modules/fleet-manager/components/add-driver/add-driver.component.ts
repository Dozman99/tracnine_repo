import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { UploadDocService } from 'src/app/modules/core/services/upload-doc/upload-doc.service';
import { ICity, ICountry, ILga, IState } from 'src/app/modules/onboard/models/country-state-city-lga';
import { OnboardService } from 'src/app/modules/onboard/services/onboard.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { SharedService } from 'src/app/modules/shared/services/shared/shared.service';
import { environment } from 'src/environments/environment';
import { Driver } from '../../models/driver';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {
  today = new Date();
  displayGender = '';
  basicInfoForm: FormGroup;
  contactForm: FormGroup;
  addressForm: FormGroup;
  titles: {
    description: string,
    id: string
  }[] = [];
  genders: { value: string, name: string }[] = [
    {
      value: 'Female',
      name: 'Female'
    },
    {
      value: 'Male',
      name: 'Male'
    },
    {
      value: 'Other',
      name: 'Other'
    }
  ]
  maritalStatusIds: { value: string, name: string }[] = [
    {
      value: 'Single',
      name: 'Single'
    },
    {
      value: 'Married',
      name: 'Married'
    },
    {
      value: 'Divorced',
      name: 'Divorced'
    },
    {
      value: 'Other',
      name: 'Other'
    }
  ]
  uploadedImage: any;
  subscription = new Subscription();
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
  subscription$ = new Subscription();
  driver!: Driver;
  existingCountry: ICountry[] = [];
  existingState: IState[] = [];
  existingCity: ICity[] = [];
  existingLga: ILga[] = []

  constructor(
    private readonly fb: FormBuilder,
    private readonly fleetService: FleetService,
    private readonly notificationService: NotificationService,
    private readonly matDialogRef: MatDialogRef<AddDriverComponent>,
    private readonly uploadDocService: UploadDocService,
    private readonly onboardService: OnboardService,
    private readonly sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public readonly data: { actionType: string, id: string },
  ) {
    this.basicInfoForm = this.fb.group({
      surname: ['', Validators.required],
      middleName: [''],
      firstName: ['', Validators.required],
      doB: ['', Validators.required],
      // maritalStatus: [''],
      // maritalStatus: ['', Validators.required],
      // titleId: [''],
      // titleId: ['', Validators.required],
      gender: ['', Validators.required]
    })
    this.contactForm = this.fb.group({
      email: [''],
      alternateEmail: ['', Validators.email],
      phone1: ['', Validators.required],
      phone2: [''],
      address1: ['', Validators.required],
      address2: ['']
    })
    this.addressForm = this.fb.group({
      // postalCode: ['']
      // postalCode: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.data.actionType === 'Edit') {
      this.subscription$.add(this.fleetService.driver.subscribe(
        res => {
          if(res) {
            this.driver = res;
          this.basicInfoForm.patchValue({
            surname: this.driver.surname,
            middleName: this.driver.middleName,
            firstName: this.driver.firstName,
            doB: this.driver.doB,
            maritalStatus: "Other",
            // maritalStatus: this.driver.maritalStatus,
            titleId: "495ff91f-b981-4f71-82d9-5c856575c3d1",
            // titleId: this.driver.titleId,
            gender: this.driver.gender
          })
          this.contactForm.patchValue({
            email: this.driver.email,
            alternateEmail: this.driver.alternateEmail,
            phone1: this.driver.phone1,
            phone2: this.driver.phone2,
            address1: this.driver.address1,
            address2: this.driver.address2
          })
          this.addressForm.patchValue({
            postalCode: "100001"
            // postalCode: this.driver.postalCode
          })

          this.listOfCountries.forEach(
            (country) => {
              if (country.id === this.driver.countryId) {
                this.existingCountry = [country];
                this.selectedCountry = this.driver.countryId;
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
                    if (state.id === this.driver.stateId) {
                      this.existingState = [state];
                      this.selectedState = this.driver.stateId;
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
                    if (city.id === this.driver.cityId) {
                      this.existingCity = [city];
                      this.selectedCity = this.driver.cityId;
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
                    if (lga.id === this.driver.lgaId) {
                      this.existingLga = [lga];
                      this.selectedLga = this.driver.lgaId;
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
      this.getDriver(this.data.id);
    }
    this.sharedService.title$
      .subscribe(
        (res: any) => {
          if (res) {
            this.titles = res;
          }
        }
      )
    this.sharedService.getTitles();
    this.getAllCountries();
  }

  convertDate(inputFormat: any) {
    function pad(s: any) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  checkform2() {
    if(this.contactForm.value.phone1.length<=10) {
      this.notificationService.publishMessage('Phone Number 1 must be 11 digits', 'danger', 0);
    }
    // if(this.contactForm.value.phone2.length<=10) {
    //   this.notificationService.publishMessage('Phone Number 2 must be 11 digits', 'danger', 0);
    // }
  }

  saveDriver() {
    if (!this.data.id) {
      let dateString = this.basicInfoForm.value.doB;
      if(dateString !="") {
        console.log("Original", dateString);
        var today = new Date();
        var birthDate = new Date(dateString);
        console.log("Converted", birthDate);
        var age = today.getFullYear() - birthDate.getFullYear();
        console.log("Get Age Year", age);
        if(age < 18 || age > 100)
        {
          console.log("Age "+age+" is restricted");
          this.notificationService.publishMessage("Age " +age+ " is restricted, Drivers must be 18 and above", 'danger', 0)
        }
        else
        {
          // console.log("Age "+age+" is allowed");
          this.createDriver();
        }
      }
      // console.log("Date of Birth", this.convertDate(this.basicInfoForm.value.doB));
      // this.createDriver();
    } else {
      this.saveNewDriverPhoto();
    }
  }

  // ValidateDOB() {
  //   let dateString  = this.convertDate(this.basicInfoForm.value.doB);
  //   // console.log("Date of Birth", dateString);
  //   var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
  // }

  createDriver() {
    this.loading = true;
    this.subscription = this.uploadDocService.getDriverPhotoUrl$
      .subscribe(
        (res: any) => {
          if (res) {
            this.basicInfoForm.value.companyId = environment.companyId;
            this.addressForm.value.countryId = this.selectedCountry;
            this.addressForm.value.stateId = this.selectedState;
            this.addressForm.value.cityId = "9a0f9a8c-7cee-4c38-a45b-5c31990ca224";
            // this.addressForm.value.cityId = this.selectedCity;
            this.addressForm.value.lgaId = "17cffe8e-9bbd-4cbf-8d14-797019af66ff";
            // this.addressForm.value.lgaId = this.selectedLga;
            this.basicInfoForm.value.photoUrl = res;
            this.contactForm.value.phone1 = this.contactForm.value.phone1.toString();
            this.contactForm.value.phone2 = this.contactForm.value.phone2.toString();
            const data = {
              ...this.basicInfoForm.value,
              ...this.contactForm.value,
              ...this.addressForm.value,
            }
            this.fleetService.createDriver(data)
              .subscribe(
                (res: any) => {
                  this.loading = false;
                  this.subscription.unsubscribe();
                  if (res['success']) {
                    this.matDialogRef.close(true);
                    this.notificationService.publishMessage(res['messages'], 'success', 0)
                  } else {
                    this.notificationService.publishMessage(res['messages'], 'danger', 0)
                  }
                }
              )
          }
        }
      )

    this.uploadDocService.saveDriverPhoto(this.uploadedImage, environment.companyId)

  }

  saveNewDriverPhoto() {
    this.loading = true;

    this.subscription = this.uploadDocService.getDriverPhotoUrl$
      .subscribe(
        (res: any) => {
          if (res) {
            this.editDriver(res);
          }
        }
      )

    if (this.uploadedImage) {
      this.uploadDocService.saveDriverPhoto(this.uploadedImage, environment.companyId)
    } else {
      this.editDriver();
    }


  }

  editDriver(photoUrl?: string) {
    if (photoUrl) {
      this.basicInfoForm.value.photoUrl = photoUrl;
    } else {
      this.basicInfoForm.value.photoUrl = this.driver.photoUrl;
    }

    this.basicInfoForm.value.companyId = environment.companyId;
    this.addressForm.value.countryId = this.selectedCountry;
    this.addressForm.value.stateId = this.selectedState;
    this.addressForm.value.cityId = "9a0f9a8c-7cee-4c38-a45b-5c31990ca224";
    // this.addressForm.value.cityId = this.selectedCity;
    this.addressForm.value.lgaId = "17cffe8e-9bbd-4cbf-8d14-797019af66ff";
    // this.addressForm.value.lgaId = this.selectedLga;
    this.contactForm.value.phone1 = this.contactForm.value.phone1.toString();
    this.contactForm.value.phone2 = this.contactForm.value.phone2.toString();
    const data = {
      ...this.basicInfoForm.value,
      ...this.contactForm.value,
      ...this.addressForm.value,
    }
    this.fleetService.editDriver(data, this.driver.id)
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.subscription.unsubscribe();
          if (res['success']) {
            this.matDialogRef.close(true);
            this.notificationService.publishMessage(res['messages'], 'success', 0)
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0)
          }
        }
      )
  }

  getDriver(id: string) {
    this.subscription$.add(this.onboardService.listOfCountries$
      .subscribe(
        (res: any) => {
          if (res) {
            console.log(res);
            this.listOfCountries = res;
            this.fleetService.fetchDriver(this.data.id);
          }
        }
      )
    )
  }

  uploadImage(event: any) {
    this.uploadedImage = event.target.files[0];
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

  getAllCountries() {
    this.onboardService.listOfCountries$
      .subscribe(
        (res: any) => {
          if (res) {
            this.listOfCountries = res;
            this.dropdownSettings = {
              singleSelection: true,
              idField: 'id',
              textField: 'description',
              allowSearchFilter: true
            };
          }
        }
      );
    this.onboardService.getCountries();
  }

  getStateByCountryId(id: any) {
    this.onboardService.getStateByCountryId(id)
      .subscribe(
        (res: any) => {
          if (res['success']) {
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
          if (res['success']) {
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
          if (res['success']) {
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

  get emailRegex() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }

  get phoneRegex() {
    return /[0-9]/
  }

}
