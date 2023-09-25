import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlMaintenanceFormComponent } from './url-maintenance-form.component';

describe('UrlMaintenanceFormComponent', () => {
  let component: UrlMaintenanceFormComponent;
  let fixture: ComponentFixture<UrlMaintenanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlMaintenanceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlMaintenanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
