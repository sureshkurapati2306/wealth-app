import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cimb-numbered-paginator',
  templateUrl: './numbered-paginator.component.html',
  styleUrls: ['./numbered-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberedPaginatorComponent {

  @Input() paginatorId = '';

  @Output() pageChange = new EventEmitter<number>();
  
  onPageChange(pageNumber) {
    this.pageChange.emit(pageNumber);

    //jump to the top of the page
    setTimeout(() => {
      const element = document.getElementById("Header");
      
      if (element) {
        document.querySelector('html').scrollTo({
          top: element.clientHeight,
          behavior: 'smooth'
        });
      }
    }, 50);
  }
}
