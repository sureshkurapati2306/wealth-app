import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlMaintenanceTableComponent } from './url-maintenance-table.component';

describe('UrlMaintenanceTableComponent', () => {
  let component: UrlMaintenanceTableComponent;
  let fixture: ComponentFixture<UrlMaintenanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlMaintenanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlMaintenanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
