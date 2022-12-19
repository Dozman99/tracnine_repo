import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCategoryModalComponent } from './package-category-modal.component';

describe('PackageCategoryModalComponent', () => {
  let component: PackageCategoryModalComponent;
  let fixture: ComponentFixture<PackageCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageCategoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
