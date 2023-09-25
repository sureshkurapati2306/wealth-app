import { AfterViewInit, ChangeDetectorRef, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FundList } from '../../models/fund-list.model';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'cimb-dialog-funds',
  templateUrl: './dialog-funds.component.html',
  styleUrls: ['./dialog-funds.component.scss'],
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: { overlayPanelClass: 'paginatorSelect' },
    },
  ],
})
export class DialogFundsComponent implements AfterViewInit {

  tableDetails =  new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('Nav') Nav: TemplateRef<any>;
  @ViewChild('FH') FH: TemplateRef<any>;
  @ViewChild('toolTipEsgFund') toolTipEsgFund: TemplateRef<any>;
  @ViewChild('esgToolTipMsgPortfolioSeelAllFunds') esgToolTipMsgPortfolioSeelAllFunds: TemplateRef<any>;
  displayedColumns = [
    'fundName',
    'navPrice',
    'perFirstMonth',
    'perThirdMonth',
    'action',
  ];
  fundsArray : FundList[];
  tempArray: FundList[];
  arrCounter : number;
  fundData: FundList[];

  filteredFunds: FundList[];

  isSelected = false;
  mediaQueryList: MediaQueryList;
  esgHeading = 'ESG Fund';
  esgContent = 'The fund strategy invested in securities with a high sustainability score and would exclude companies with poor records related to ESG. The strategy will contribute to the long-term viability of our environment and way of life. It enable investors to pursue their financial goals while supporting a better future for humanity.';
  shariahFilterApplied = false;
  esgFilterApplied = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public _bottomSheet: MatBottomSheet,
    private _changeDetectorRef: ChangeDetectorRef,
    public mediaMatcher: MediaMatcher

  ) {
    this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
   }

  ngAfterViewInit() {
    this.initialization();
    this.tableDetails.sort = this.sort;
    this._changeDetectorRef.detectChanges();
  }

  initialization(): void {
    this.tempArray = this.data.preselectedFund;
    this.arrCounter = this.tempArray?.length;

    const allFunds = this.data.fundData;

    //filter all funds array to exclude pre-existing
    this.fundsArray = allFunds?.filter(ar => !this.tempArray.find(fund => (fund.fund_name === ar.fund_name) ))


    //call filter to return data based on condition
    this.filterFunds(this.fundsArray);

    this.isSelected = true;

    //call sort fund
    this.sortFunds(this.fundsArray);


    this.tableDetails = new MatTableDataSource( this.fundsArray);
    
    //sort column by property
    this.sortColumnByProperty();

    //filter table array to exclude existing data from tempArray
    this.tableDetails.data = this.fundsArray;
    this.tableDetails.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Funds per page'
  
  }

  filterFunds(fundArr) {
    if(fundArr) {
      this.filteredFunds = fundArr.filter(item => {
        return item.fund_status !== 'SO' && item.fund_status !== 'SOHO'
      });
    }
  }

  sortFunds(fundArr) {
    if(fundArr) {
      this.filteredFunds =  fundArr?.sort((a, b) => {
        if (a.fund_status === 'I' && b.fund_status !== 'I') return 1;
        if (a.fund_status !== 'I' && b.fund_status === 'I') return -1;
        return a.fund_name > b.fund_name ? 1 : -1;
      });
    }
  }
   /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  sortColumnByProperty() {
    this.tableDetails.sortingDataAccessor = (item: any, property) => {
      switch (property) {
          case 'fundName':
              return item.fund_name;
          case 'navPrice':
              return +item.nav_price;
          case 'perFirstMonth':
              return +item.one_month;
          case 'perThirdMonth':
              return +item.three_month;
          default:
              return item[property];
      }
    };
  }

  cancel() {
    const data = this.tempArray;
    if(data) {
      this.dialogRef.close(data);
    }
    
  }
  openNavBottomSheet() {
    this._bottomSheet.open(this.Nav, {
        panelClass: 'tooltip-action-sheet',
    });
  }   

  openFundHolidayBottomSheet() {
      this._bottomSheet.open(this.FH, {
          panelClass: 'tooltip-action-sheet',
      });
  }

  onSelect(fund) {
    this.tempArray?.push(fund);

    this.arrCounter++;

    this.tableDetails.data = this.tableDetails.data?.filter(item => !this.tempArray?.includes(item));
  }
  onRemove(fund, index) {
    const findElement = this.tempArray?.find((element, i) => {

      if(element === fund && i === index) {
       return this.tempArray.splice(index, 1);
      };
    });
    this.arrCounter--;
    this.filteredFunds?.push(findElement);
    if(this.shariahFilterApplied || this.esgFilterApplied || this.shariahFilterApplied && this.esgFilterApplied) {
      this.applyFilters();
    }
    else{
      this.tableDetails.data = this.filteredFunds;
    }

    this._changeDetectorRef.detectChanges();
    return this.filteredFunds;


   
  }

  filterByShariah(event) {
    this.shariahFilterApplied = event.checked;
    this.applyFilters();
  }
  
  filterByEsg(event) {
    this.esgFilterApplied = event.checked;
    this.applyFilters();
  }
  
  applyFilters() {
    let filteredData = this.fundsArray?.slice();
    if (this.shariahFilterApplied && !this.esgFilterApplied) {
      filteredData = filteredData?.filter(item => item.fund_indicator === 'I');
    }
  
    else if (this.esgFilterApplied && !this.shariahFilterApplied) {
      filteredData = filteredData?.filter(item => item.esg_fund === 'Y');
    }

    else if (this.shariahFilterApplied && this.esgFilterApplied) {
      filteredData = filteredData?.filter(item => item.fund_indicator === 'I' && item.esg_fund === 'Y');
    }
   
    this.tableDetails.data = filteredData;
  }
  openESGFundsOnlyBottomSheetSeeAllFundsWeb() {
    this._bottomSheet.open(this.toolTipEsgFund, {
        panelClass: 'tooltip-action-sheet',
    });
  }
  openESGFundsOnlyBottomSheetForSeeAllFundsMobile(){
    this._bottomSheet.open(this.esgToolTipMsgPortfolioSeelAllFunds, {
      panelClass: 'tooltip-action-sheet',
    });
  }

}
