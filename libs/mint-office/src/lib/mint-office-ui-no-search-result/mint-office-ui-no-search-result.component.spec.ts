import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintOfficeUiNoSearchResultComponent } from './mint-office-ui-no-search-result.component';

describe('MintOfficeUiNoSearchResultComponent', () => {
  let component: MintOfficeUiNoSearchResultComponent;
  let fixture: ComponentFixture<MintOfficeUiNoSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintOfficeUiNoSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintOfficeUiNoSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
