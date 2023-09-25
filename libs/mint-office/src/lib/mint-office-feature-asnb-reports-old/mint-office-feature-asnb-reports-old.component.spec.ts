import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintOfficeFeatureAsnbReportsOldComponent } from './mint-office-feature-asnb-reports-old.component';

describe('MintOfficeFeatureAsnbReportsOldComponent', () => {
  let component: MintOfficeFeatureAsnbReportsOldComponent;
  let fixture: ComponentFixture<MintOfficeFeatureAsnbReportsOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeFeatureAsnbReportsOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficeFeatureAsnbReportsOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
