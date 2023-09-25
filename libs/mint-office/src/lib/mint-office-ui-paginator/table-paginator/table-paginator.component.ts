import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    Input,
    ElementRef,
    Output,
    EventEmitter,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'cimb-office-table-paginator',
    templateUrl: './table-paginator.component.html',
    styleUrls: ['./table-paginator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginatorComponent {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    rows = [];

    dataSource: MatTableDataSource<any[]>;

    loadingState = '';

    @Input() pageSizeOptions: number[] = [10];
    @Input() pageSize = 10;
    @Input() pageIndex = 0;
    @Input() set dataSourceRows(data: MatTableDataSource<any[]>) {
        this.dataSource = data;
        setTimeout(() => {
            this.initPaginator();
        });
    }
    @Input() set getLoadingState(data: string) {
        this.loadingState = data;

        if (this.loadingState == 'success') {
            setTimeout(() => {
                this.dataSource.paginator?.firstPage();
            });
        }
    }

    @Output() pageChange = new EventEmitter<PageEvent>();

    constructor(private el: ElementRef<HTMLElement>) {}

    initPaginator(): void {
        this.dataSource.paginator = this.paginator;

        if (this.dataSource.paginator?._intl) {
            this.dataSource.paginator._intl.getRangeLabel = (
                page: number,
                pageSize: number,
                length: number,
            ) => {
                length = Math.max(length, 0);
                const startIndex = page * pageSize;
                const endIndex =
                    startIndex < length
                        ? Math.min(startIndex + pageSize, length)
                        : startIndex + pageSize;
                return `Showing ${startIndex + 1} to ${endIndex} of ${length} entries`;
            };
        }

        //emit initial state
        this.pageChange.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            previousPageIndex: 0,
            length: this.dataSource.paginator?.length,
        });

        // Change paginator icon
        const firstBtn = this.el.nativeElement.querySelector('.mat-paginator-navigation-first');

        if (firstBtn) {
            firstBtn.classList.add('icon-arrow-left-start');
        }

        const prevBtn = this.el.nativeElement.querySelector('.mat-paginator-navigation-previous');

        if (prevBtn) {
            prevBtn.classList.add('icon-arrow-left-regular');
        }

        const nextBtn = this.el.nativeElement.querySelector('.mat-paginator-navigation-next');

        if (nextBtn) {
            nextBtn.classList.add('icon-arrow-right-regular');
        }

        const lastBtn = this.el.nativeElement.querySelector('.mat-paginator-navigation-last');

        if (lastBtn) {
            lastBtn.classList.add('icon-arrow-right-end');
        }
    }

    emitPageChangeEvent(event: PageEvent) {
        //emit when changing page
        this.pageChange.emit(event);
    }
}
