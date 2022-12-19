import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UploadDocService } from 'src/app/modules/core/services/upload-doc/upload-doc.service';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-add-driver-docs',
  templateUrl: './add-driver-docs.component.html',
  styleUrls: ['./add-driver-docs.component.scss']
})
export class AddDriverDocsComponent implements OnInit, OnDestroy {
  docsForm: FormGroup;
  loading = false;
  subscription$ = new Subscription();
  regulatoryDocumentTypes: any[] = [];
  uploadedFile: any
  existingDoc: any;
  maxIssueDate = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      id: string,
      type: string,
      action: string
    },
    private readonly fb: FormBuilder,
    private readonly fleetService: FleetService,
    private readonly notificationService: NotificationService,
    private readonly uploadDocsService: UploadDocService,
    private readonly matDialogRef: MatDialogRef<AddDriverDocsComponent>
  ) {
    this.docsForm = this.fb.group({
      "fileName": ['', Validators.required],
      "regulatoryDocumentTypeId": ['', Validators.required],
      "issueDate": ['', Validators.required],
      "expiryDate": ['', Validators.required],
      "narration": ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.subscription$.add(
      this.uploadDocsService.regulatoryDocumentTypes$
        .subscribe(
          (res: any) => {
            if (res) {
              this.regulatoryDocumentTypes = res;
              if (this.data.action === 'Edit') {
                switch (this.data.type) {
                  case 'Driver':
                    this.getDriverData();
                    break;
                  case 'Vehicle':
                    this.getVehicleData();
                    break;
                }
              }
            }
          }
        )
    )
    this.uploadDocsService.getRegulatoryDocumentType();
  }

  createDoc() {
    switch (this.data.type) {
      case 'Driver':
        this.createDriver();
        break;
      case 'Vehicle':
        this.createVehicle();
        break;
    }
  }

  createDriver() {
    this.loading = true;
    this.subscription$.add(
    this.uploadDocsService.getDriverDocsUrl$
      .subscribe(
        (res) => {
          if (res) {
            this.docsForm.value.companyDriverId = this.data.id;
            this.docsForm.value.fileExtension = this.uploadedFile.name.split('.')[this.uploadedFile?.name.split('.').length - 1];
            this.docsForm.value.fileUrl = res;
            this.docsForm.value.fileSize = this.uploadedFile.size;

            this.uploadDocsService.createDriverDocs(this.docsForm.value)
              .subscribe(
                (res: any) => {
                  this.loading = false;
                  if (res['success']) {
                    this.notificationService.publishMessage('Driver document created successfully', 'success', 0);
                    this.matDialogRef.close(true);
                  } else {
                    this.notificationService.publishMessage(res['messages'], 'danger', 0);
                  }
                }
              )
          }
        }
      )
    )

    this.uploadDocsService.saveDriverDocs(this.uploadedFile, this.data.id)

  }

  createVehicle() {
    this.loading = true;
    this.subscription$.add(
    this.uploadDocsService.getVehicleDocsUrl$
      .subscribe(
        (res) => {
          if (res) {
            this.docsForm.value.companyVehicleId = this.data.id;
            this.docsForm.value.fileExtension = this.uploadedFile.name.split('.')[this.uploadedFile?.name.split('.').length - 1];
            this.docsForm.value.fileUrl = res;
            this.docsForm.value.fileSize = this.uploadedFile.size;

            this.uploadDocsService.createVehicleDocs(this.docsForm.value)
              .subscribe(
                (res: any) => {
                  this.loading = false;
                  if (res['success']) {
                    this.notificationService.publishMessage('Vehicle document created successfully', 'success', 0);
                    this.matDialogRef.close(true);
                  } else {
                    this.notificationService.publishMessage(res['messages'], 'danger', 0);
                  }
                }
              )
          }
        }
      )
    )

    this.uploadDocsService.saveVehicleDocs(this.uploadedFile, this.data.id)

  }

  getDriverData() {
    this.uploadDocsService.getSingleDriverDoc(this.data.id)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.modifyForm(res['data']);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0)
          }
        }
      )
  }

  getVehicleData() {
    this.uploadDocsService.getSingleVehicleDoc(this.data.id)
      .subscribe(
        (res: any) => {
          if (res['success']) {
            this.modifyForm(res['data']);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }

  uploadFile(event: any) {
    this.uploadedFile = event.target.files[0];
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  modifyForm(doc: any) {
    this.existingDoc = doc;
    this.docsForm.patchValue({
      "fileName": doc.fileName,
      "regulatoryDocumentTypeId": doc.regulatoryDocumentTypeId,
      "issueDate": doc.issueDate,
      "expiryDate": doc.expiryDate,
      "narration": doc.narration
    })
  }


  updateDoc() {
    switch (this.data.type) {
      case 'Driver':
        this.updateDriverDocImage();
        break;
      case 'Vehicle':
        this.updateVehicleDocImage();
        break;
      default:
    }
  }

  updateDriverDocImage() {
    this.loading = true;
    if (this.uploadedFile) {
    this.subscription$.add(
      this.uploadDocsService.updateDriverDocsUrl$
        .subscribe(
          (res) => {
            if (res) {
              this.docsForm.value.fileExtension = this.uploadedFile.name.split('.')[this.uploadedFile?.name.split('.').length - 1];
              this.docsForm.value.fileUrl = res;
              this.docsForm.value.fileSize = this.uploadedFile.size;
              this.updateDriverDocs();
            }
          }
        )
    )

      this.uploadDocsService.updateDriverDocs(this.uploadedFile, this.data.id);
    } else {
      this.docsForm.value.fileExtension = this.existingDoc.fileExtension;
      this.docsForm.value.fileUrl = this.existingDoc.url;
      this.docsForm.value.fileSize = this.existingDoc.fileSize;
      this.updateDriverDocs();
    }



  }

  updateDriverDocs() {
    this.uploadDocsService.updateDriverDoc(this.docsForm.value, this.data.id)
      .subscribe(
        (res: any) => {
          this.loading = false;
          if (res['success']) {
            this.notificationService.publishMessage('Driver document updated successfully', 'success', 0);
            this.matDialogRef.close(true);
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }

  updateVehicleDocImage() {
    this.loading = true;
    if (this.uploadedFile) {
    this.subscription$.add(
      this.uploadDocsService.updateVehicleDocsUrl$
        .subscribe(
          (res) => {
            if (res) {
              this.docsForm.value.fileExtension = this.uploadedFile.name.split('.')[this.uploadedFile?.name.split('.').length - 1];
              this.docsForm.value.fileUrl = res;
              this.docsForm.value.fileSize = this.uploadedFile.size;
              this.updateVehicleDocs();
            }
          }
        )
    )

      this.uploadDocsService.updateVehicleDocs(this.uploadedFile, this.data.id);
    } else {
      this.docsForm.value.fileExtension = this.existingDoc.fileExtension;
      this.docsForm.value.fileUrl = this.existingDoc.url;
      this.docsForm.value.fileSize = this.existingDoc.fileSize;
      this.updateVehicleDocs();
    }



  }

  updateVehicleDocs() {
    this.uploadDocsService.updateVehicleDoc(this.docsForm.value, this.data.id)
      .subscribe(
        (res: any) => {
          this.loading = false;
          if (res['success']) {
            this.notificationService.publishMessage('Vehicle document updated successfully', 'success', 0);
            this.matDialogRef.close();
          } else {
            this.notificationService.publishMessage(res['messages'], 'danger', 0);
          }
        }
      )
  }

}
