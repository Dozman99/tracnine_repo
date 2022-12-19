import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCategoryInterface } from 'src/app/core/types/item-category';
import { PackageCategoryModalComponent } from '../package-category-modal/package-category-modal.component';

@Component({
  selector: 'app-package-item-modal',
  templateUrl: './package-item-modal.component.html',
  styleUrls: ['./package-item-modal.component.scss']
})
export class PackageItemModalComponent implements OnInit {
  selectedItem: any;
  /* productItems = [
    {id: 1, name:'Food'},
    {id: 2, name:'Clothing'},
    {id: 3, name:'Shoes'},
    {id: 4, name:'Electronics'},
    {id: 5, name:'Jewelries'},
    {id: 6, name:'Accessories'},
    {id: 7, name:'Documents'}
  ] */
  quantity = 1;

  constructor(
    private matDialogRef: MatDialogRef<PackageCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public productItems: ItemCategoryInterface[]
  ) { }

  ngOnInit(): void {
  }

  selectItem(item: any) {
    this.quantity = 1;
    this.selectedItem = item;
  }

  close() {
    if (this.selectedItem && this.quantity) {
      this.matDialogRef.close({
        id: this.selectedItem.id,
        item: this.selectedItem.description,
        quantity: this.quantity
      })
      return;
    }
    this.matDialogRef.close();
  }

}
