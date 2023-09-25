import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintOfficeUiNoResultComponent } from './mint-office-ui-no-result.component';

describe('MintOfficeUiNoResultComponent', () => {
  let component: MintOfficeUiNoResultComponent;
  let fixture: ComponentFixture<MintOfficeUiNoResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeUiNoResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficeUiNoResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
