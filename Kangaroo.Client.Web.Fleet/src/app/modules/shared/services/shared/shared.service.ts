import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private readonly titleUrl = `${environment.coreApi}/title/getall`;

  title$ = new BehaviorSubject<any>(false);

  constructor(
    private readonly http: HttpClient,
    private modalRef: MatDialog
  ) { }

  getTitles() {
    this.http.get(`${this.titleUrl}`)
    .subscribe(
      (res: any) => {
        if(res['success']) {
          this.title$.next(res['data']);
        }
      }
    )
  }

  openDeleteConfirmationModal(deleteApi: any) {
    console.log(deleteApi)
    return  this.modalRef.open(
      DeleteConfirmationComponent,
      {
        height: '30vh',
        width: '40vh',
        data: {deleteApi}
      }
    )
  }
}
