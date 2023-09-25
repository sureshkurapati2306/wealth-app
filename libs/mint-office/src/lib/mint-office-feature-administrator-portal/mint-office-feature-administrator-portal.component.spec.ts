import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintOfficeFeatureAdministratorPortalComponent } from './mint-office-feature-administrator-portal.component';

describe('MintOfficeFeatureAdministratorPortalComponent', () => {
  let component: MintOfficeFeatureAdministratorPortalComponent;
  let fixture: ComponentFixture<MintOfficeFeatureAdministratorPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeFeatureAdministratorPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficeFeatureAdministratorPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
