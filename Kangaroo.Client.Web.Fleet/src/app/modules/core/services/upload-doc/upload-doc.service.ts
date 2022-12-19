import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadDocService {
  private readonly regulatoryDocumentTypeUrl = `${environment.coreApi}/regulatory-document-type/GetAll`;
  private readonly driverDocUrl = `${environment.coreApi}/company-driver-doc`;
  private readonly vehicleDocUrl = `${environment.coreApi}/company-vehicle-doc`;

  getDriverPhotoUrl$ = new BehaviorSubject<any>('');
  getDriverDocsUrl$ = new BehaviorSubject<any>('');
  updateDriverDocsUrl$ = new BehaviorSubject<any>('');
  getVehicleDocsUrl$ = new BehaviorSubject<any>('');
  updateVehicleDocsUrl$ = new BehaviorSubject<any>('');
  getVehicleFileUrl$ = new BehaviorSubject<any>('');
  regulatoryDocumentTypes$: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(
    private readonly storage: AngularFireStorage,
    private readonly http: HttpClient
  ) { }

  saveDriverPhoto(uploadedDriverPhoto: any, companyID: any) {
    let downloadURL;
    const n = Date.now();
    const filePath = `Company/${companyID}/company-driver/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Company/${companyID}/company-driver/${n}`, uploadedDriverPhoto);
    task
    .snapshotChanges()
    .subscribe(
      res => {
        downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              this.getDriverPhotoUrl$.next(url);
            }
          });
      }
    )

  }

  saveDriverDocs(uploadedDriverDocs: any, companyDriverID: any) {
    let downloadURL;
    const n = Date.now();
    const filePath = `Company/${companyDriverID}/company-driver-docs/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Company/${companyDriverID}/company-driver-docs/${n}`, uploadedDriverDocs);
    task
    .snapshotChanges()
    .subscribe(
      res => {
        downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              this.getDriverDocsUrl$.next(url);
            }
          });
      }
    )

  }

  updateDriverDocs(uploadedDriverDocs: any, companyDriverID: any) {
    let downloadURL;
    const n = Date.now();
    const filePath = `Company/${companyDriverID}/company-driver-docs/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Company/${companyDriverID}/company-driver-docs/${n}`, uploadedDriverDocs);
    task
    .snapshotChanges()
    .subscribe(
      res => {
        downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              this.updateDriverDocsUrl$.next(url);
            }
          });
      }
    )

  }
  saveVehicleDocs(uploadedVehcileDocs: any, companyVehicleID: any) {
    let downloadURL;
    const n = Date.now();
    const filePath = `Company/${companyVehicleID}/company-vehcile-docs/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Company/${companyVehicleID}/company-vehcile-docs/${n}`, uploadedVehcileDocs);
    task
    .snapshotChanges()
    .subscribe(
      res => {
        downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              this.getVehicleDocsUrl$.next(url);
            }
          });
      }
    )

  }

  updateVehicleDocs(uploadedVehcileDocs: any, companyVehicleID: any) {
    let downloadURL;
    const n = Date.now();
    const filePath = `Company/${companyVehicleID}/company-vehcile-docs/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Company/${companyVehicleID}/company-vehcile-docs/${n}`, uploadedVehcileDocs);
    task
    .snapshotChanges()
    .subscribe(
      res => {
        downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              this.updateVehicleDocsUrl$.next(url);
            }
          });
      }
    )

  }

  saveVehicleFile(uploadedVehicleFile: any, companyID: any) {
    let downloadURL;
    const n = Date.now();
    const filePath = `Company/${companyID}/Vehicle/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Company/${companyID}/Vehicle/${n}`, uploadedVehicleFile);
    task
    .snapshotChanges()
    .subscribe(
      res => {
        downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              this.getVehicleFileUrl$.next(url);
            }
          });
      }
    )

  }

  getRegulatoryDocumentType() {
    this.http.get(`${this.regulatoryDocumentTypeUrl}`)
      .pipe(
        retry(3)
      )
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.regulatoryDocumentTypes$.next(res['data']);
          }
        }
      )
  }

  getDriverDoc(id: string) {
    return this.http.get(`${this.driverDocUrl}/search/${id}`)
  }

  getVehicleDoc(id: string) {
    return this.http.get(`${this.vehicleDocUrl}/search/${id}`)
  }

  getSingleDriverDoc(id: string) {
    return this.http.get(`${this.driverDocUrl}/GetItem/${id}`)
  }

  getSingleVehicleDoc(id: string) {
    return this.http.get(`${this.vehicleDocUrl}/GetItem/${id}`)
  }

  deleteDriverDoc(id: string) {
    return this.http.delete(`${this.driverDocUrl}/Delete/${id}`)
  }

  deleteVehicleDoc(id: string) {
    return this.http.delete(`${this.vehicleDocUrl}/Delete/${id}`)
  }

  createDriverDocs(body: any) {
    return this.http.post(`${this.driverDocUrl}/Upload`, body)
  }

  createVehicleDocs(body: any) {
    return this.http.post(`${this.vehicleDocUrl}/Upload`, body)
  }
  
  updateDriverDoc(data: any, id: string) {
    return this.http.put(`${this.driverDocUrl}/Update/${id}`, data)
  }

  updateVehicleDoc(data: any, id: string) {
    return this.http.put(`${this.vehicleDocUrl}/Update/${id}`, data)
  }
}
