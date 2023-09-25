import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';

import { CardFundTransactComponent } from './card-fund-transact.component';

import {MatRadioModule} from '@angular/material/radio';

import {MintInputModule} from '../../mint-input/mint-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { inputFundDefaultMockData } from '@cimb/shared/services';


describe('CardFundTransactComponent', () => {
  let component: CardFundTransactComponent;
  let fixture: ComponentFixture<CardFundTransactComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFundTransactComponent],
      imports: [MatDialogModule, MatBottomSheetModule,BrowserAnimationsModule, MatRadioModule, MintInputModule, ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        provideMockStore({initialState: {}})
    ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFundTransactComponent);
    component = fixture.componentInstance;
    component.fund = inputFundDefaultMockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openIndicativeAmountActionSheet', () => {
    expect(component.openIndicativeAmountActionSheet()).toBeUndefined();
  });

  it('should openSwitchActionSheet', () => {
    expect(component.openSwitchActionSheet()).toBeUndefined();
  });

  it('should openNAVactionSheet', () => {
    expect(component.openNAVactionSheet()).toBeUndefined();
  });

  // it('should openNAVactionSheet', () => {
  //   jest.spyOn(store, 'select').mockReturnValue(of(true));
  //   component.ngOnInit();
  //   expect(component.openedFromLandingPage).toBe(true)
  // });

});
