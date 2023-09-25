import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintOfficeFeatureRefConfigComponent } from './mint-office-feature-ref-config.component';

describe('MintOfficeFeatureRefConfigComponent', () => {
  let component: MintOfficeFeatureRefConfigComponent;
  let fixture: ComponentFixture<MintOfficeFeatureRefConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeFeatureRefConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficeFeatureRefConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
