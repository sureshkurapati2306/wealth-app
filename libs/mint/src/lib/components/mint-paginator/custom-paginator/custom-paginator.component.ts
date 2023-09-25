import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cimb-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.scss'],
})
export class CustomPaginatorComponent implements OnInit, OnChanges {
  @Input() myHoldings;
  @Input() myHoldingsLength;
  @Output() valueChangeEvent: EventEmitter<any> = new EventEmitter();
  counter: number;
  pages: number;
  extraPage: number;
  totalPages = [];
  pagesToShow = [];
  currentPage: number;
  totalPagesLength : number;
  pagesToShowLength = 5;
  pagesToFormattedLength :number;


  ngOnInit(): void {
    this.currentPage = 1;
  }

  clickPage(page: number) {
    this.currentPage = page;
    this.valueChangeEvent.emit(this.currentPage);
  }

  clickPreviousIcon() {
    //this.pagesToFormattedLength = this.pagesToShowLength;
    //if (this.currentPage !==1) this.currentPage = this.currentPage - 1;

    // if(this.currentPage !==1){
    //     this.currentPage = this.currentPage -1;
    // }


    if(this.currentPage > (this.pagesToFormattedLength-5)) {
        //this.pagesToFormattedLength = this.pagesToFormattedLength-5 ;
        //this.currentPage = this.pagesToFormattedLength-5;
        if(this.currentPage != (this.pagesToFormattedLength-5)+ 1) {

            this.currentPage = this.currentPage-1;
        } else {

        this.currentPage = this.pagesToFormattedLength-5;
        this.pagesToShow = this.totalPages.slice(this.pagesToFormattedLength-10, this.pagesToFormattedLength-5 )
        //eye
        //this.pagesToShowLength = this.pagesToShowLength-5;
        this.pagesToShowLength = this.pagesToFormattedLength-5;
        }
    }
    else{
        if(this.currentPage != (this.pagesToFormattedLength-5)+ 1) {
            this.currentPage = this.currentPage-1;
        } else {
        this.currentPage = this.pagesToFormattedLength-5;
        this.pagesToShow = this.totalPages.slice(this.pagesToFormattedLength-15, this.pagesToFormattedLength-10 )
        }

    }
    if(this.currentPage <= 5) {
        this.pagesToShowLength = 5;

    }
    this.valueChangeEvent.emit(this.currentPage);
  }

  clickNextIcon() {

    if (this.currentPage ===undefined) {
      this.currentPage = 1;
    }
    if (this.currentPage !==this.pages) {
      this.currentPage = this.currentPage + 1;
    }

    if(this.currentPage > this.pagesToShowLength) {
        this.pagesToShow = this.totalPages.slice(this.pagesToShowLength, this.pagesToShowLength+5 )
        this.pagesToShowLength = this.pagesToShowLength+5 ;
    }
    if(this.pagesToShowLength > this.totalPagesLength) {
        this.pagesToFormattedLength = this.pagesToShowLength;
        this.pagesToShowLength = this.totalPagesLength;

    }

    this.valueChangeEvent.emit(this.currentPage);
  }

  goToFirstPage1() {
    //this.currentPage = this.totalPages.length - (this.totalPages.length-1);
    this.pagesToShow = [];
    //this.pagesToFormattedLength = this.pagesToShowLength;
    //this.pagesToFormattedLength =  this.pagesToShowLength
    if(this.pagesToShowLength > this.totalPagesLength) {
    this.pagesToFormattedLength =  this.pagesToShowLength
      this.pagesToShowLength = this.totalPagesLength;
    }

    if(this.currentPage > 10) {
        this.pagesToShow = this.totalPages.slice(this.pagesToFormattedLength-10, this.pagesToFormattedLength-5 )
    } else{
        this.pagesToShow = this.totalPages.slice(this.pagesToFormattedLength-15, this.pagesToFormattedLength-10 )
    }

    if(this.pagesToShowLength >5 && this.currentPage >10) {
       this.currentPage = (this.pagesToFormattedLength) - 9;
    } else {
        this.currentPage = this.pagesToShowLength - (this.pagesToShowLength-1)
    }
    this.pagesToShowLength = this.pagesToShowLength -5;

    if(this.currentPage === 1) {
        this.pagesToShowLength = 5;
    }

    this.valueChangeEvent.emit(this.currentPage);
  }

  goToFirstPage() {
    this.pagesToShow = [];
    if(this.pagesToShowLength > this.totalPagesLength) {
    this.pagesToFormattedLength =  this.pagesToShowLength
      this.pagesToShowLength = this.totalPagesLength;
    }
    if(this.currentPage > (this.pagesToFormattedLength-5)) {
        this.pagesToShow = this.totalPages.slice(this.pagesToFormattedLength-10, this.pagesToFormattedLength-5 )

    } else{
        this.pagesToShow = this.totalPages.slice(this.pagesToFormattedLength-15, this.pagesToFormattedLength-10 )
    }

    if(this.pagesToShowLength >5 && this.currentPage >10) {
       this.currentPage = (this.pagesToFormattedLength) - 9;
    } else {
        this.currentPage = this.pagesToShowLength - (this.pagesToShowLength-1)
    }

    this.pagesToShowLength = this.pagesToShowLength -5;

    if(this.currentPage === 1) {
        this.pagesToShowLength = 5;
    }

    this.valueChangeEvent.emit(this.currentPage);
  }

  goToLastPage() {
    this.pagesToShow = [];

    if(this.totalPagesLength > this.pagesToShowLength) {
        this.pagesToShow = this.totalPages.slice(this.pagesToShowLength, this.pagesToShowLength+5 )
    }

    //this.currentPage = this.totalPages.length;
    if(this.pagesToShowLength > this.totalPagesLength) {
      this.currentPage = this.pagesToShowLength;
      this.pagesToFormattedLength =  this.pagesToShowLength
    } else {
      this.currentPage = this.pagesToShowLength +1;
    }
    this.pagesToShowLength = this.pagesToShowLength+5;
    if(this.pagesToShowLength > this.totalPagesLength) {
        this.pagesToFormattedLength =  this.pagesToShowLength
        this.pagesToShowLength = this.totalPagesLength
    }

    this.valueChangeEvent.emit(this.currentPage);
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.myHoldingsLength){
      this.myHoldingsLength = changes.myHoldingsLength.currentValue;

    }
    if(changes && changes.currentPage) {
      this.currentPage = changes.currentPage.currentValue;
    }

    //Make the current page selection to 1 when myHoldingsLength <10
    if(this.myHoldingsLength < 10) {
      this.currentPage = 1;
    }
    this.pages = Math.floor(this.myHoldingsLength / 10);
    if(this.pages != 0) {

    //this.whichPage = 1;
    this.extraPage = this.myHoldingsLength % 10;
    if (this.extraPage !==0 && this.extraPage <= 9) {
      this.extraPage = 1;
    }

    this.pages = this.pages + this.extraPage;
    this.totalPages= [];
    for (let i = 1; i <= this.pages; i++) {
      this.totalPages.push(i);

    }
  } else {
    //Cases when there is less than 10 funds only
    this.totalPages= [];
    this.totalPages.push(1);
    this.pages = 1;

  }
  this.totalPagesLength = this.totalPages.length;
  if(this.currentPage <= 5) {
  this.pagesToShow =  this.totalPages.slice(0,5);
  }

  if(changes && changes.pagesToShow) {
    this.pagesToShow = changes.pagesToShow.currentValue;
  }
  }

}
