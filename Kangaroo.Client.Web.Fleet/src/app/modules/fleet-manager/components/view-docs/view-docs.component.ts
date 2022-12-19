import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UploadDocService } from 'src/app/modules/core/services/upload-doc/upload-doc.service';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
import { NotificationService } from 'src/app/modules/shared/services/notification/notification.service';
import { SharedService } from 'src/app/modules/shared/services/shared/shared.service';
import { FleetService } from '../../services/fleet.service';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';

@Component({
  selector: 'app-view-docs',
  templateUrl: './view-docs.component.html',
  styleUrls: ['./view-docs.component.scss']
})
export class ViewDocsComponent implements OnInit, OnDestroy {
  displayedColumns = ['Document Type', 'Action']
  docs: any[] = [];
  subscription$ = new Subscription();
  regulatoryDocumentTypes: any[] = [];
  loadingDocs = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: {
      element: any,
      type: string
    },
    private readonly fleetService: FleetService,
    private readonly notificationService: NotificationService,
    private readonly uploadDocsService: UploadDocService,
    private readonly sharedService: SharedService,
    private readonly modalRef: MatDialogRef<ViewDocsComponent>) { }

  ngOnInit(): void {
    this.subscription$.add(
      this.uploadDocsService.regulatoryDocumentTypes$
        .subscribe(
          (res: any) => {
            if (res) {
              this.regulatoryDocumentTypes = res;

              switch(this.data.type) {
                case 'Driver':
                  this.getDriverDoc();
                break;
                case 'Vehicle':
                  this.getVehicleDoc();
                break;
              }
            }
          }
        )
    )
    this.uploadDocsService.getRegulatoryDocumentType();
  }

  getDriverDoc() {
    this.uploadDocsService.getDriverDoc(this.data.element.id)
    .subscribe(
      (res: any) => {
        this.loadingDocs = false;
        if(res['success']) {
          this.docs = res['data']['items'];
          this.docs.forEach((doc) => {
            this.regulatoryDocumentTypes.forEach((docType) => {
              if(doc.regulatoryDocumentTypeId === docType.id) {
                doc.documentTypeName = docType.description;
              }
            })
          });
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }

      }
    )
  }

  getVehicleDoc() {
    this.uploadDocsService.getVehicleDoc(this.data.element.id)
    .subscribe(
      (res: any) => {
        this.loadingDocs = false;
        if(res['success']) {
          this.docs = res['data']['items'];
          this.docs.forEach((doc) => {
            this.regulatoryDocumentTypes.forEach((docType) => {
              if(doc.regulatoryDocumentTypeId === docType.id) {
                doc.documentTypeName = docType.description;
              }
            })
          });
        } else {
          this.notificationService.publishMessage(res['messages'], 'danger', 0);
        }

      }
    )
  }

  viewDoc(element: any) {
    this.fleetService.openDocImageModal(element.url);
  }

  deleteDoc(element: any) {
    let openModal!: MatDialogRef<DeleteConfirmationComponent>;
    let deleteApi;
    switch(this.data.type) {
      case 'Driver':
        deleteApi = () => this.uploadDocsService.deleteDriverDoc(element.id)
        openModal = this.sharedService.openDeleteConfirmationModal(deleteApi);
      break;
      case 'Vehicle':
        deleteApi = () => this.uploadDocsService.deleteVehicleDoc(element.id);
        openModal = this.sharedService.openDeleteConfirmationModal(deleteApi);
      break;
    }


    openModal.afterClosed()
    .subscribe(
      (res: any) => {
        if(res) {
          this.modalRef.close();
        }
      }
    )
  }

  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }

  editDocs(element: any) {
    switch(this.data.type) {
      case 'Driver':
        this.fleetService.openDocsModal(element.id, 'Driver', 'Edit')
        .afterClosed()
        .subscribe(
          (res: any) => {
            if(res) {
              this.getDriverDoc();
            }
          }
        );
      break;
      case 'Vehicle':
        this.fleetService.openDocsModal(element.id, 'Vehicle', 'Edit')
        .afterClosed()
        .subscribe(
          (res: any) => {
            if(res) {
              this.getVehicleDoc();
            }
          }
        );
      break;
    }

  }

  addDocs() {
    console.log(this.data.element)
    switch(this.data.type) {
      case 'Driver':
        this.fleetService.openDocsModal(this.data.element.id, this.data.type, 'Add')
        .afterClosed()
        .subscribe(
          (res: any) => {
            if(res) {
              this.getDriverDoc();
            }
          }
        );;
        break;
      case 'Vehicle':
        this.fleetService.openDocsModal(this.data.element.id, this.data.type, 'Add')
        .afterClosed()
        .subscribe(
          (res: any) => {
            if(res) {
              this.getVehicleDoc();
            }
          }
        );
        break;
      default:
    }

  }

}
