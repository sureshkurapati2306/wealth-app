import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightTextPipe } from '@cimb/core';
import { fundListMockData, FundSwitchService } from '@cimb/shared/services';
import { of } from 'rxjs';

import { AutocompleteSwitchInFundsComponent } from './autocomplete-switch-in-funds.component';

class FundSwitchServiceMock {
  getListOfSwitchToFunds() {
    return of(fundListMockData);
  }
}

describe('AutocompleteSwitchInFundsComponent', () => {
  let component: AutocompleteSwitchInFundsComponent;
  let fixture: ComponentFixture<AutocompleteSwitchInFundsComponent>;
  let fundSwitchService: FundSwitchService;
  let loader: HarnessLoader;
  let autocomplete: MatAutocompleteHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteSwitchInFundsComponent, HighlightTextPipe ],
      imports: [MatAutocompleteModule, MatInputModule, ReactiveFormsModule, MatBottomSheetModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { 
          provide: FundSwitchService, useClass: FundSwitchServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fundSwitchService = TestBed.inject(FundSwitchService);
    fixture = TestBed.createComponent(AutocompleteSwitchInFundsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;

    const spy = jest.spyOn(fundSwitchService, 'getListOfSwitchToFunds');
    fundSwitchService.getListOfSwitchToFunds().subscribe();

    autocomplete = await loader.getHarness(MatAutocompleteHarness);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openOptions', () => {
    fixture.detectChanges();

    expect(component.openOptions(new Event('click'))).toBeUndefined();
  });

  it('should closeOptions', () => {
    fixture.detectChanges();

    expect(component.closeOptions()).toBeUndefined();
  });

  it('should openFundHolidayBottomSheet', () => {
    fixture.detectChanges();

    expect(component.openFundHolidayBottomSheet()).toBeUndefined();
  });

  it('should switchFundDetails', () => {
    fixture.detectChanges();

    expect(component.switchFundDetails('CBT06A')).toBeUndefined();
  });

  it('should getListOfSwitchToFundDetails', () => {
    fixture.detectChanges();

    expect(component.getListOfSwitchToFundDetails('690629135086','10280000511148','A80111274','CBT06A')).toBeUndefined();
  });

  it('should ngOnDestroy', () => {
    fixture.detectChanges();

    expect(component.ngOnDestroy()).toBeUndefined();
  });

});
