import { MapsAPILoader } from '@agm/core';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from "@angular/router";
import { ItemCategoryInterface, ProductItemsInterface } from 'src/app/modules/core/interfaces/item-category';
import { PackageCategoryModalComponent } from 'src/app/modules/shared/components/package-category-modal/package-category-modal.component';
import { PackageItemModalComponent } from 'src/app/modules/shared/components/package-item-modal/package-item-modal.component';
import { Order } from 'src/app/modules/core/interfaces/order';
import { DeliveryCalculatorService } from 'src/app/modules/core/services/delivery-calculator/delivery-calculator.service';
import { OrderService } from 'src/app/modules/core/services/order/order.service';
import { ItemCategoryService } from 'src/app/modules/core/services/item-category/item-category.service';
import { PricingCalculator } from 'src/app/modules/core/interfaces/pricing-calculator/pricing-calculator';

@Component({
  selector: 'app-delivery-calculator',
  templateUrl: './delivery-calculator.component.html',
  styleUrls: ['./delivery-calculator.component.scss']
})
export class DeliveryCalculatorComponent implements OnInit, AfterViewInit {
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

  constructor(
    private matDialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private deliveryCalculatorService: DeliveryCalculatorService,
    private orderService: OrderService,
    private itemCategoryService: ItemCategoryService
  ) { }

  ngOnInit() {
    this.getItemCategory();
  }

  ngAfterViewInit() {
    this.prepareTheLocationPicker(this.searchElementRef1);
    this.prepareTheLocationPicker(this.searchElementRef2);
  }

  prepareTheLocationPicker(element: ElementRef) {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      const options = {
        types: ['(regions)'],
        componentRestrictions: {country: "ng"}
      }

      let autocomplete = new google.maps.places.Autocomplete(element.nativeElement, options);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          console.log(place)
          const address = place.formatted_address;
          if (element.nativeElement.name === 'pick-up') {
            this.origins = [];
            this.origins.push(address)
          } else if (element.nativeElement.name === 'drop-off') {
            this.destination = [];
            this.destination.push(address)
          }
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  openCategoryModal() {
    this.matDialog.open(PackageCategoryModalComponent, {
      width: '40vw',
      height: '70vh',
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
      width: '40vw',
      height: '70vh',
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

  submit(form: any, search1: string, search2: string) {
    console.log(form);
    if (form.status === 'INVALID') {
      return;
    }
    this.loading = true;
    let distance = new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': this.origins, 'destinations': this.destination, travelMode: google.maps.TravelMode.DRIVING}, (result) => {
      this.distance = result.rows[0].elements[0].distance.value;
      this.duration = result.rows[0].elements[0].duration.value;

      localStorage.setItem('phoneNumber', form.value.phoneNumber);
      localStorage.setItem('category', JSON.stringify(this.productCategory));
      localStorage.setItem('item', JSON.stringify(this.selectedItem));
      localStorage.setItem('quantity', this.selectedItem.quantity);
      localStorage.setItem('weight', form.value.weight);
      localStorage.setItem('pickUp', this.origins[0]);
      localStorage.setItem('dropOff', this.destination[0]);

      const data = {
        "stateId": '',
        "itemCategoryId": '',
        "weight": 0,
        "distance": 45,
        "deliveryDuration": 50
      }

      // Json build up
      let order: Order = this.orderService.order.getValue();
      order.details = order.details?.map(detail => {
        return {
          ...detail,
          itemCategoryId: this.productCategory.id,
          itemCategoryDetailId: this.selectedItem.id,
          pickUp: this.origins[0],
          dropOff: this.destination[0],
          quantity: this.selectedItem.quantity,
          weight: this.selectedItem.weight,
          isFragile: form.value.isFragile
        }
      });

      order.deliveryDetail = {
        ...order.deliveryDetail,
        customerPhoneNumber: form.value.phoneNumber
      };

      this.orderService.setOrder(order);
      // End Json build up

      this.deliveryCalculatorService.calculateDelivery(data)
      .subscribe(
        (res: any) => {
          localStorage.setItem('prices', JSON.stringify(res.data));
          this.loading = false;
          this.router.navigate(['/delivery-type']);
        }
      )
    });
  }

  calculateDistance() {

    this.pricingPayload = {
      stateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      itemCategoryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      weight: 0,
      distance: 0,
      deliveryDuration: 0
    };
    this.orderService.getPrice(this.pricingPayload);
    this.router.navigate(['/delivery-type']);
  }

  getItemCategory() {
    this.itemCategoryService.getAllItemCategory()
    .subscribe(
      res => {
        this.itemCategories = res.data;
      }
    )
  }

  getCategoryProducts(id: string) {
    this.itemCategoryService.getCategoryProduct(id)
    .subscribe(res => {
      this.productItem = res['data'];
    })
  }

}
