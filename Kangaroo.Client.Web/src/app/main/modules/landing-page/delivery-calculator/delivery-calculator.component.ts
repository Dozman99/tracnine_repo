import { MapsAPILoader } from '@agm/core';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PackageCategoryModalComponent } from '../../../../shared/components/package-category-modal/package-category-modal.component';
import { PackageItemModalComponent } from '../../../../shared/components/package-item-modal/package-item-modal.component';
import { Router } from "@angular/router";
import { DeliveryCalculatorService } from 'src/app/core/data/delivery-calculator/delivery-calculator.service';
import { PricingCalculator } from "../../../models/pricing-calculator/pricing-calculator";
import { OrderService } from "../../../services/order.service";
import { ItemCategoryService } from 'src/app/main/services/item-category/item-category.service';
import { ItemCategoryInterface, ProductItemsInterface } from 'src/app/core/types/item-category';
import { Order } from "../../../models/order/order";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Address } from "../../../models/order/address";

@Component({
  selector: 'app-delivery-calculator',
  templateUrl: './delivery-calculator.component.html',
  styleUrls: ['./delivery-calculator.component.scss']
})

export class DeliveryCalculatorComponent implements OnInit {
  @ViewChild('search1')
  public searchElementRef1: ElementRef | any;
  @ViewChild('search2')
  public searchElementRef2: ElementRef | any;
  productCategory: any = {id: '', name: ''};
  productItem: ProductItemsInterface[] = [];
  geoCoder: google.maps.Geocoder | any;
  latitude: number | any;
  longitude: number | any;
  zoom: number | any;
  address: any;
  origins: any[] = [];
  destination: any[] = [];
  distance: number | undefined;
  duration: number | undefined;

  pricingPayload!: PricingCalculator;
  itemCategories: ItemCategoryInterface[] = [];
  selectedItem: any;

  loading = false;
  message = '';

  loadingCategory = false;
  loadingCategoryProduct = false;
  showOtherFormValue = false;

  pickUp: string = '';
  pickUpLatLng: string[] = [];
  pickUpLat: number = 0;
  pickUpLng: number = 0;
  pickUpAddress!: Address | null;
  dropOff: string = '';
  dropOffLatLng: string[] = [];
  dropOffLat: number = 0;
  dropOffLng: number = 0;
  dropOffAddress!: Address | null;

  constructor(
    private matDialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private deliveryCalculatorService: DeliveryCalculatorService,
    private orderService: OrderService,
    private itemCategoryService: ItemCategoryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.getItemCategory();
    this.geoCoder = new google.maps.Geocoder;
  }

  // ngAfterViewInit() {
  //   this.prepareTheLocationPicker(this.searchElementRef1);
  //   this.prepareTheLocationPicker(this.searchElementRef2);
  // }

  // prepareTheLocationPicker(element: ElementRef) {
  //   this.mapsAPILoader.load().then(() => {
  //     this.setCurrentLocation();
  //     this.geoCoder = new google.maps.Geocoder;
  //     const options = {
  //       types: ['(regions)'],
  //       componentRestrictions: {country: "ng"}
  //     }
  //
  //     let autocomplete = new google.maps.places.Autocomplete(element.nativeElement, options);
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }
  //
  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //         this.zoom = 12;
  //
  //         const address = place.formatted_address;
  //         if (element.nativeElement.name === 'pick-up') {
  //           this.origins = [];
  //           this.origins.push(address)
  //         } else if (element.nativeElement.name === 'drop-off') {
  //           this.destination = [];
  //           this.destination.push(address)
  //         }
  //       });
  //     });
  //   });
  // }

  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 8;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }
  //


  async getAddress(latitude: any, longitude: any): Promise<Address|null> {
    try {

      let {results} = await this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } });

      let address1 = "";

      let lengthOfAddressComponent = results[0].address_components.length;
      results[0].address_components.forEach((address: any, index: number) => {
        if (index < (lengthOfAddressComponent - 6)) {
          address1 = (address1 === "") ? address.long_name : address1 + ", " + address.long_name;
        }
      });

      return {
        address: address1,
        code: results[0].address_components[results[0].address_components.length - 1].long_name,
        country: results[0].address_components[results[0].address_components.length - 2].long_name,
        state: results[0].address_components[results[0].address_components.length - 3].long_name,
        lga: results[0].address_components[results[0].address_components.length - 4].long_name,
        city: results[0].address_components[results[0].address_components.length - 5].long_name,
      }

    } catch (error) {
      return null
    }


  }

  openCategoryModal() {
    this.matDialog.open(PackageCategoryModalComponent, {
      width: 'auto',
      height: 'auto',
      data: this.itemCategories
    }).afterClosed().subscribe(
      data => {
        this.productCategory = data;
        if(this.productCategory) {
          this.getCategoryProducts(this.productCategory.id);
        }
      }
    )
  }

  openItemModal() {
    this.matDialog.open(PackageItemModalComponent, {
      width: 'auto',
      height: 'auto',
      autoFocus: false,
      disableClose: true,
      data: this.productItem
    }).afterClosed().subscribe(
      data => {
        if(data) {
          this.selectedItem = data;
        }
      }
    )
  }

  submit(form: any) {
    if (form.status === 'INVALID') {
      return;
    }
    let distance = new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': this.pickUpLatLng, 'destinations': this.dropOffLatLng, travelMode: google.maps.TravelMode.DRIVING}, (result) => {
      this.distance = Math.round(result?.rows[0]?.elements[0]?.distance?.value/1000);
      this.duration = Math.round(result?.rows[0]?.elements[0]?.duration?.value/60);

      // localStorage.setItem('phoneNumber', form.value.phoneNumber);
      localStorage.setItem('category', JSON.stringify(this.productCategory));
      localStorage.setItem('item', JSON.stringify(this.selectedItem));
      localStorage.setItem('quantity', this.selectedItem.quantity);
      localStorage.setItem('weight', this.selectedItem.weight);
      localStorage.setItem('pickUp', this.pickUp);
      localStorage.setItem('dropOff', this.dropOff);

      localStorage.setItem('productCategory', this.productCategory.description);
      localStorage.setItem('type', this.selectedItem.item);

      // if (this.pickUp == this.dropOff) {
      //   alert("PickUp address and DropOff address cannot be the same");
      //   console.log("address same");
      // }

      const data = {
        "stateId": '5818132c-0d67-446f-965d-26fa0c1e0c91',
        "itemCategoryId": this.productCategory.id,
        "itemCategoryDetailId": this.selectedItem.id,
        "weight": this.selectedItem.weight,
        "distance": this.distance,
        "deliveryDuration": this.duration
      }
      this.loading = true;

      this.deliveryCalculatorService.calculateDelivery(data)
      .subscribe(
        (res: any) => {

          if (res?.data?.length < 1) {
            this.loading = false;
            this.message = "Pricing information not available";
          }
          else if (res.messages == 'You must provide valid information') {
            this.loading = false;
            alert("No Pricing Information for the addresses selected, Provide VALID PickUp and DropOff Addresses");
            console.log("address pricing impossible due to locations");
          }
          else if (this.pickUp == this.dropOff) {
            this.loading = false;
            alert("PickUp address and DropOff address cannot be the same");
            console.log("address same");
          }
          else {
            localStorage.setItem('prices', JSON.stringify(res.data));

            this.ngZone.run(() => {
              this.router.navigate(['/delivery-type']);
            });

            // Json build up
            let order: Order = this.orderService.order.getValue();
            order.details = order.details?.map(detail => {
              return {
                ...detail,
                // itemCategoryId: this.productCategory.id,
                // itemCategoryDetailId: this.selectedItem.id,
                pickUp: this.pickUp,
                dropOff: this.dropOff,
                deliverToLongitude: this.dropOffLng,
                deliverToLatitude: this.dropOffLat,
                deliverToAddress1: this.dropOffAddress?.address,
                deliverToAddress2: "",
                deliverToCity: this.dropOffAddress?.city,
                deliverToLGA: this.dropOffAddress?.lga,
                deliverToAddressState: this.dropOffAddress?.state,
                deliverToAddressCountry: this.dropOffAddress?.country,
                deliverToPostalCode: this.dropOffAddress?.code,
                quantity: this.selectedItem.quantity,
                weight: 0,
                isFragile: !!form.value.isFragile
              }
            });

            order.deliveryDetail = {
              ...order.deliveryDetail,
              // customerPhoneNumber: form.value.phoneNumber,
              customerAddressLatitude: this.pickUpLat,
              customerAddressLongitude: this.pickUpLng,
              customerAddress1: this.pickUpAddress?.address,
              customerAddress2: "",
              customerCity: this.pickUpAddress?.city,
              customerLGA: this.pickUpAddress?.lga,
              customerAddressState: this.pickUpAddress?.state,
              customerAddressCountry: this.pickUpAddress?.country,
              customerPostalCode: this.pickUpAddress?.code
            };

            this.orderService.setOrder(order);
            // End Json build up
          }

        }, error => {
          this.loading = false;
        })
    });
  }

  // calculateDistance() {
  //
  //   this.pricingPayload = {
  //     stateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //     itemCategoryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //     weight: 0,
  //     distance: 0,
  //     deliveryDuration: 0
  //   };
  //   this.orderService.getPrice(this.pricingPayload);
  //   this.router.navigate(['/delivery-type']);
  // }

  getItemCategory() {
    this.loadingCategory = true;
    this.itemCategoryService.getAllItemCategory()
    .subscribe(
      res => {
        this.itemCategories = res.data;
        this.loadingCategory = false;
      }
    )
  }

  getCategoryProducts(id: string) {
    this.loadingCategoryProduct = true;
    this.showOtherFormValue = false;
    this.itemCategoryService.getCategoryProduct(id)
    .subscribe(res => {
      this.productItem = res['data'];
      this.loadingCategoryProduct = false;
      this.showOtherFormValue = true;
    })
  }

  async handlePickUpAddressChange(address: any) {
    this.pickUp = address.formatted_address;
    this.pickUpLatLng = [
      `${address.geometry.location.lat()},
      ${address.geometry.location.lng()}`
    ];
    this.pickUpLat = address.geometry.location.lat();
    this.pickUpLng = address.geometry.location.lng();
    this.pickUpAddress = await this.getAddress(this.pickUpLat, this.pickUpLng);
  }

  async handleDropOffAddressChange(address: any) {
    this.dropOff = address.formatted_address;
    this.dropOffLatLng = [
      `${address.geometry.location.lat()},
      ${address.geometry.location.lng()}`
    ];
    this.dropOffLat = address.geometry.location.lat();
    this.dropOffLng = address.geometry.location.lng();
    this.dropOffAddress = await this.getAddress(this.dropOffLat, this.dropOffLng)
  }

}
