import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers/';
import * as moment from 'moment';
@Component({
  selector: 'cimb-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit, OnChanges {
  selected: Date | null;
  prevMonth = new Date();
  //today's date
  todayDate:Date = new Date();
  startDate : any;
  endDate : any;
  startDateSelected : boolean;
  endDateSelected : boolean;
  purchaseDetailDataObj: any
  purchaseDetailDataFromAPI: any

  @Input() selectedRangeValue: DateRange<Date> | undefined;
  @Input() purchaseDetailData ;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  @Output() dateFilteredPurchaseDetailData : EventEmitter<any> = new EventEmitter();
  @ViewChild(MatMenuTrigger) menuClose: MatMenuTrigger;

  @Output() selectedStartDate: EventEmitter<Date> = new EventEmitter();
  @Output() selectedEndDate: EventEmitter<Date> = new EventEmitter();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  startEndDate = '';

  fromDate = '';
  toDate = '';

  constructor(private store: Store<fromStore.AppState>,) {}
  ngOnInit() {
    const today = new Date();
    const month = today.getMonth(); //in 1 month
    const year = today.getUTCFullYear();
    const day = today.getDay();

    this.prevMonth = new Date(year, month, day);

    this.startDateSelected = false;
    this.endDateSelected = false;
    this.store.select('dashbordReducers').subscribe((data) => {
        const purchaseDetailData = data.purchaseDetailData;

        if (purchaseDetailData) {
            this.purchaseDetailDataFromAPI = purchaseDetailData;
        }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.purchaseDetailData = changes.purchaseDetailData.currentValue;
  }

  selectedChange(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        start.setHours(23,59,59)
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        end.setHours(23,59,59)
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    // Selected range
    //this.selectedRangeValueChange.emit(this.selectedRangeValue);

    let formattedStartDate = '';
    if(this.selectedRangeValue.start) {
      this.startDate = this.selectedRangeValue.start;
      this.startDateSelected = true;
     
      formattedStartDate = moment(this.startDate).format('DD/MM/YYYY');

      this.fromDate = moment(this.startDate).format('DD MMM YYYY');


      this.startEndDate = formattedStartDate
    } else {
      this.startDateSelected = false;
    }
    if(this.selectedRangeValue.end) {
      this.endDate = this.selectedRangeValue.end;
      this.endDateSelected = true
      const formattedEndDate = moment(this.endDate).format('DD/MM/YYYY');

      if( this.startDate) {
        this.startEndDate = formattedStartDate + ' - ' + formattedEndDate;

        this.toDate = moment(this.endDate).format('DD MMM YYYY');
      }
    } else {
      this.endDateSelected = false;
    }

  }

  applyDateFilter() {
    const tempDateFilterArray = [];
    //this.purchaseDetailData = this.purchaseDetailData.slice(0,2)
    for(let i=0;i<this.purchaseDetailDataFromAPI.length; i++) {
      const transactionDateTime = new Date(this.purchaseDetailDataFromAPI[i].transactionDatetime).getTime();
      if( (transactionDateTime > this.startDate.getTime() || transactionDateTime == this.startDate.getTime()) &&
          (transactionDateTime < this.endDate.getTime() || transactionDateTime == this.endDate.getTime()) ) {
          tempDateFilterArray.push(this.purchaseDetailDataFromAPI[i])
      } else {
        tempDateFilterArray.push([])
      }
    }
    this.dateFilteredPurchaseDetailData.emit(tempDateFilterArray)
    this.menuClose.closeMenu();

  }
  closeMenu() {
    this.menuClose.closeMenu();
  }
}
