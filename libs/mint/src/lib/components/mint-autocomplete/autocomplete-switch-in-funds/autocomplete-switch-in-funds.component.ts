import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { SwitchFund } from '@cimb/shared/models';
import { AnalyticService, FundSwitchService } from '@cimb/shared/services';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
import { DialogFundComponent } from '../../mint-dialog/dialog-fund/dialog-fund.component';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';

@Component({
  selector: 'cimb-autocomplete-switch-in-funds',
  templateUrl: './autocomplete-switch-in-funds.component.html',
  styleUrls: ['./autocomplete-switch-in-funds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteSwitchInFundsComponent implements OnInit, OnDestroy {

  filterInputSubject = new BehaviorSubject<string>('');

  filterInputSubscription = new Subscription();

  fundListSubscription = new Subscription();

  filteredOptions$: Observable<SwitchFund[]>;
  
  fundList: SwitchFund[] = [];

  switch = new FormControl();

  highlightedText: string;

  selectedSwitchToFund: SwitchFund;

  @Input() fundHouseCode = '';

  @Input() excludeFundName = '';

  userObservable: Observable<any>;
  userSubscription: Subscription;
  userData: any;
  selectedAccounts:any;
  switchfundList:any;



  @Input() set value(fundCode: string) {
    this.getListOfSwitchToFunds()
      .subscribe(() => {
        //pre-select fund if selectedFundCode is provided
        if(fundCode) {
          this.selectedSwitchToFund = this.fundList.find(fund => fund.fundCode.toLowerCase() === fundCode.toLowerCase());
          this.switch.setValue(this.selectedSwitchToFund?.fundName);
          this.switchFundDetails(this.selectedSwitchToFund);
          if(!this.fundHouseCode) {
            //if @Input fundHouseCode is not provided, filter the fundList manually based on the managerCode (aka fundHouseCode) we can determine from the provided @Input value
            //we need this hacky logic because the funds data in cart list doesn't contain any fundHouseCode/managerCode information

            const fundHouseCode = this.fundList.find(fund => fund.fundCode == fundCode).managerCode;

            this.fundList = this.fundList.filter(fund => fund.managerCode === fundHouseCode);

          }

        } else {
          this.switch.setValue('');
        }
      });
  }

  @Output() afterOptionSelected = new EventEmitter<SwitchFund>();
  
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  @ViewChild('mobileSearch') mobileSearch: ElementRef;
  
  constructor(
    private fundSwitchService: FundSwitchService,
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private store: Store<fromStore.AppState>,
    private analyticService: AnalyticService
  ) { }

  ngOnInit() {
    //capture filter user input
    this.filterInputSubscription = this.switch.valueChanges
      .pipe(
        debounceTime(100)
      )
      .subscribe(keyword => {
        if(keyword?.length >=3) {
          return this.filterInputSubject.next(keyword)
        } else {
          return this.filterInputSubject.next('')
        }
       
      });

    //perform filtering
    this.filteredOptions$ = this.filterInputSubject
      .pipe(
        map(searchKeyword => {

          this.highlightedText = searchKeyword;

          //filter dropdown options
          return this.fundList.filter(fund => {
            const fundName = fund.fundName.toLowerCase();
            return fundName.includes(searchKeyword.toLowerCase()) && fundName !== this.excludeFundName.toLowerCase();
          });
        })
      );
      
  }

  getListOfSwitchToFunds(): Observable<SwitchFund[]> {

    if(this.fundList.length) {
      return of(this.fundList);
    } else {
      //load the funds by fund house code from API
      return this.fundSwitchService.getListOfSwitchToFunds(this.fundHouseCode)
        .pipe(
          tap(data => {
            const sortedData = data.sort((a, b) => a.fundName.toLowerCase() > b.fundName.toLowerCase() ? 1 : -1);
            this.fundList = sortedData;
          })
        );
    }

  }

  openOptions(evt): void {
    evt.stopPropagation();
    //reset the filter to show all results
    this.filterInputSubject.next('');
    this.autocomplete.openPanel();
  }

  closeOptions() {
    this.autocomplete.closePanel();
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedSwitchToFund = this.fundList.find(fund => fund.fundName.toLowerCase() === event.option.value.toLowerCase());
    this.afterOptionSelected.emit(this.selectedSwitchToFund);
    this.switchFundDetails(this.selectedSwitchToFund);
  }  

  openFundHolidayBottomSheet(){
    this._bottomSheet.open(MobileTooltipComponent, {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'Fund Holiday',
        actionContent:
          '<p>The fund is currently not available due to the fund holiday declared by the fund house. Pricing of the fund will resume on the next business day for the fund.</p>',
      },
    });
  }

  
  switchFundDetails(selectedSwitchToFund:any){
    this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.userData = users.user;
            this.selectedAccounts = users && users.unitTrustAccount ? users.unitTrustAccount : null;
        });
        const { customer_id, cifNumber } = this.userData;
    if (selectedSwitchToFund) {
      this.getListOfSwitchToFundDetails(customer_id, cifNumber, this.selectedAccounts, selectedSwitchToFund?.fundCode)
        .subscribe(() => {
          console.log("")
      });
    } 
  }

  getListOfSwitchToFundDetails(customer_id: any, cifNumber: any, selectedAccounts: any, fundCode: any): Observable<any[]> {
    return this.fundSwitchService.getSwitchFundDetailByFundCode(customer_id, cifNumber, selectedAccounts, fundCode).pipe(
      tap(data => {
        this.switchfundList = data;
      })
    );
  }

  openFundDetails() {
    this.dialog.open(DialogFundComponent, {
      panelClass: ['full-width', 'dialog-fund'],
      maxWidth: '1216px',
      autoFocus: false,
      data: {
        dialogHeading: 'Unable to Transact (No CASA)',
        dialogContent:
          '<p>To complete your transaction, open a current or savings account/-i with CIMB. You may apply via CIMB Clicks.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Okay',
        dialogImage: '<em class="icon-danger"></em>',
        switchfundList: this.switchfundList
      },
    });
    this.analyticService.loadPopUpAnalytics('Unable to Transact (No CASA)');
  }

  ngOnDestroy() {
    this.fundListSubscription?.unsubscribe();
    this.filterInputSubscription?.unsubscribe();
  }

}
