import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BatchFileScheduler } from '../core/models/batchfilescheduler.model';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import { DialogPromptComponent } from '../mint-office-ui-dialog/dialog-prompt/dialog-prompt.component';
import * as BatchFileSchedulerActions from './+state/batch-file-scheduler.actions';
import { State } from './+state/batch-file-scheduler.reducer';
import * as BatchFileSchedulerSelector from './+state/batch-file-scheduler.selectors';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BatchFileSchedulerService } from '../core/services/batch-file-scheduler.service';

@Component({
  selector: 'cimb-office-batch-file-scheduler',
  templateUrl: './mint-office-feature-batch-file-scheduler.component.html',
  styleUrls: ['./mint-office-feature-batch-file-scheduler.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MintOfficeFeatureBatchFileSchedulerComponent implements OnInit {

  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'Batch File Scheduler',
      url: null
    }
  ];
  
  dataSource;
  filteredTableData: MatTableDataSource<BatchFileScheduler>;

  schedulers$!: Subscription;
 
  displayedColumns: string[] = ['position', 'startDate', 'occurence', 'endDate', 'schedulerName', 'schedulerType','jobName','status', 'action'];

  activeFilter = 1;

  filters = [
    {
      id: 1, 
      name: 'All',
      value: 'All'
    },
    {
      id: 2, 
      name: 'Upcoming',
      value: 'U'
    },
    {
      id: 3, 
      name: 'Ongoing',
      value: 'O'
    },
    {
      id: 4, 
      name: 'Completed',
      value: 'C'
    },
    {
      id: 5, 
      name: 'Fail',
      value: 'F'
    },
    {
      id: 6, 
      name: 'Past',
      value: 'P'
    }
  ]

  searchForm: FormGroup;

  expandedRow: BatchFileScheduler | null;
  
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild('filter', {static: false}) 
  filter: ElementRef;

  constructor(
    private el: ElementRef<HTMLElement>,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<State>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private someService: BatchFileSchedulerService
  ) {}
    
    

  ngOnInit(): void {

   this.schedulers$ = this.store
    .select(BatchFileSchedulerSelector.selectBatchFileSchedulerListing)
    .pipe(
      tap((data: BatchFileScheduler[]) => {
        this.dataSource = data;
        this.filteredTableData = new MatTableDataSource<BatchFileScheduler>(data);

        if(data) {
          this.showPaginator();
        }

      })
    ).subscribe();

    
    //dispatch get data
    this.store.dispatch(BatchFileSchedulerActions.loadBatchFileSchedulers());

    //search form
    this.searchForm = this.fb.group({
      searchKey: ['']
    });
    
  }

  showPaginator(): void {
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    setTimeout(() => {
      this.filteredTableData.paginator = this.paginator;
      
      this.showFilterPagination(this.filteredTableData.paginator);

      // Change paginator icon
      const firstBtn = this.el.nativeElement.querySelector(
        '.mat-paginator-navigation-first'
      );
      if (firstBtn) {
        firstBtn.classList.add('icon-arrow-left-start');
      }
      const prevBtn = this.el.nativeElement.querySelector(
        '.mat-paginator-navigation-previous'
      );
      if (prevBtn) {
        prevBtn.classList.add('icon-arrow-left-regular');
      }
      const nextBtn = this.el.nativeElement.querySelector(
        '.mat-paginator-navigation-next'
      );
      if (nextBtn) {
        nextBtn.classList.add('icon-arrow-right-regular');
      }
      const lastBtn = this.el.nativeElement.querySelector(
        '.mat-paginator-navigation-last'
      );
      if (lastBtn) {
        lastBtn.classList.add('icon-arrow-right-end');
      }
    }, 0)
  }

  searchFilter() { 
    const searchKey: string = this.searchForm.value.searchKey;

    this.filteredTableData.filter = searchKey.trim();

    if (this.filteredTableData.paginator) {
      this.filteredTableData.paginator.firstPage();
    }
  }

  checkSearchKey(value: string): void {
    if(value === '') {
      this.filteredTableData = new MatTableDataSource(this.dataSource);

      this.filteredTableData.paginator = this.paginator;

      this.showFilterPagination(this.filteredTableData.paginator);
    }
  }

  toggleFilterStatus(value: string) {
    
    if(value === 'All') {
      this.filteredTableData = new MatTableDataSource(this.dataSource);

      this.filteredTableData.paginator = this.paginator;

      this.showFilterPagination(this.filteredTableData.paginator);

    } else {
      /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
      const data = this.dataSource?.filter((item)=> {
        return item.schedulerStatus == value;
      });
      /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
      this.filteredTableData = new MatTableDataSource(data);

      //re-initialize paginator during filtering
      this.filteredTableData.paginator = this.paginator;

      //check rows length
      /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
      if(data.length === 0) {
       
        this.filteredTableData.paginator._intl.getRangeLabel = () => {
          return `Showing 0 to 0 of 0 entries`;
        };
      } else {
        this.showFilterPagination(this.filteredTableData.paginator);
      }
      
      
    }
    
  }


  goToPage() {
    this.router.navigate(['add-batch-file-scheduler'], {relativeTo: this.route});
  }

  
  editSchedulerItem(schedulerItem) {
    this.store.dispatch(
      BatchFileSchedulerActions.openBatchFileScheduler(schedulerItem));
    this.router.navigate(['edit-batch-file-scheduler'], {relativeTo: this.route});
  }


  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this.schedulers$.unsubscribe();
  }
  openDialog(schedulerItem) {
    const currentID = schedulerItem.schedulerId;

    const dialogRef =  this.dialog.open(DialogPromptComponent, {
      panelClass: 'custom-dialog',
      maxWidth: '520px',
      autoFocus: false,
      data: {
        title: 'Delete Batch File Scheduler?',
        icon: 'icon-danger-1',
        description: 'This will remove the batch file scheduler immediately and you can’t undo this action.',
        btnCancelLabel: 'Cancel',
        btnOkLabel: 'Delete'
      }
    });

    //subscribe to modal once button is clicked
    dialogRef.afterClosed().subscribe((result) => {
      /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
      if(result.result === 'ok') {
        this.store.dispatch(BatchFileSchedulerActions.deleteBatchFileScheduler({id: currentID}));
      }
    })

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showFilterPagination(paginator: MatPaginator) {
    if(paginator) {
      this.filteredTableData.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        length = Math.max(length, 0);
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        const startIndex = page * pageSize;
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `Showing ${startIndex + 1} to ${endIndex} of ${length} entries`;
      };
    }
    
  }

}
