import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageItemModalComponent } from './package-item-modal.component';

describe('PackageItemModalComponent', () => {
  let component: PackageItemModalComponent;
  let fixture: ComponentFixture<PackageItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
