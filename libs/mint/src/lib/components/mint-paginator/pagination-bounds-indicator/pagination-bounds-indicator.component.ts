import { Component, Input, ChangeDetectionStrategy, OnChanges, ElementRef, ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'cimb-pagination-bounds-indicator',
  templateUrl: './pagination-bounds-indicator.component.html',
  styleUrls: ['./pagination-bounds-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationBoundsIndicatorComponent implements OnChanges, AfterContentInit {

  @Input() totalRecords: number;
  @Input() currentPageNumber: number;
  @Input() itemsPerPage: number;

  @ContentChild('lowerBounds') elemLowerBounds!: ElementRef;
  @ContentChild('upperBounds') elemUpperBounds!: ElementRef;
  @ContentChild('totalRecords') elemTotalRecords!: ElementRef;

  lowerBounds: number;
  upperBounds: number;

  ngOnChanges() {
    this.updateFields();
  }

  ngAfterContentInit() {
    this.updateFields();
  }

  updateFields() {

    if(this.totalRecords && this.currentPageNumber && this.itemsPerPage) {
      this.lowerBounds = (this.currentPageNumber - 1) * this.itemsPerPage + 1;
      this.upperBounds = Math.min((this.currentPageNumber - 1) * this.itemsPerPage + this.itemsPerPage , this.totalRecords );
    }
    
    if(this.elemLowerBounds && this.elemUpperBounds && this.elemTotalRecords) {
      this.elemLowerBounds.nativeElement.innerHTML = this.lowerBounds;
      this.elemUpperBounds.nativeElement.innerHTML = this.upperBounds;
      this.elemTotalRecords.nativeElement.innerHTML = this.totalRecords;
    }

  }

}
