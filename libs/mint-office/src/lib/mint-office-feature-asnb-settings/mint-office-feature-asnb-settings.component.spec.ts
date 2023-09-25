import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintOfficeFeatureAsnbSettingsComponent } from './mint-office-feature-asnb-settings.component';

describe('MintOfficeFeatureAsnbSettingsComponent', () => {
  let component: MintOfficeFeatureAsnbSettingsComponent;
  let fixture: ComponentFixture<MintOfficeFeatureAsnbSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeFeatureAsnbSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficeFeatureAsnbSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
