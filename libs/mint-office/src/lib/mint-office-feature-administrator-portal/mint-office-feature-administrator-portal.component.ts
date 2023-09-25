import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AdministratorTable, ListUser, UserRole } from '../core/models/administrator-portal.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DeleteUser, UpdateUser, administratorPortalInit } from './+state/administrator-portal.actions';
import { getAdministratorTable, getRole } from './+state/administrator-portal.selectors';
import { takeUntil, tap } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DialogPromptComponent } from '../mint-office-ui-dialog/dialog-prompt/dialog-prompt.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'cimb-office-mint-office-feature-administrator-portal',
  templateUrl: './mint-office-feature-administrator-portal.component.html',
  styleUrls: ['./mint-office-feature-administrator-portal.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MintOfficeFeatureAdministratorPortalComponent implements OnInit, OnDestroy {

  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'ADMINISTRATOR PORTAL',
      url: null
    }
  ];

  searchForm: FormGroup;

  roles: UserRole[];

  tableData: AdministratorTable;

  dataSource: ListUser[] = [];

  displayedColumns: string[] = ['username', 'name', 'staff_id', 'groups', 'created_date', 'enabled', 'action'];

  filteredTableData: MatTableDataSource<ListUser>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  // @ViewChild('filter', { static: false })
  // filter: ElementRef;

  _unsubscribeAll: Subject<void> = new Subject<void>();

  resultsLength = 1000;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private store: Store, private cdr: ChangeDetectorRef, private el: ElementRef<HTMLElement>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(administratorPortalInit({ pageIndex: 1 }));

    this.store
      .select(getRole)
      .pipe(
        tap((data) => {
          if (data) {
            this.roles = data;
          }
        })
      ).subscribe();

    this.store
      .select(getAdministratorTable)
      .pipe(
        takeUntil(this._unsubscribeAll)
      ).subscribe((data) => {
        if (data) {
          this.tableData = data;
          this.dataSource = data.users;
          this.filteredTableData = new MatTableDataSource<ListUser>(data.users);
          this.cdr.detectChanges();
          this.showPaginator();
        }
      });

    this.showPaginator();
    //search form
    this.searchForm = this.fb.group({
      searchKey: ['']
    });
  }

  showPaginator(): void {
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    setTimeout(() => {
      // this.filteredTableData.paginator = this.paginator;

      // this.showFilterPagination(this.filteredTableData.paginator);

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

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    // const pageSize = event.pageSize;

    this.paginator.hasNextPage = () => {
      if (this.tableData.isLastPage) {
        return false;
      } else {
        return true;
      }
    };

    this.store.dispatch(administratorPortalInit({ pageIndex: pageIndex + 1}));
  }

  searchFilter() {
    const searchKey: string = this.searchForm.value.searchKey;

    // this.filteredTableData.filter = searchKey.trim();

    // if (this.filteredTableData.paginator) {
    //   this.filteredTableData.paginator.firstPage();
    // }
    
    this.store.dispatch(administratorPortalInit({ pageIndex: 1, search: searchKey }));
  }

  checkSearchKey(value: string): void {
    if(value === '') {
      // this.filteredTableData = new MatTableDataSource(this.dataSource);

      // this.filteredTableData.paginator = this.paginator;

      this.showFilterPagination(this.filteredTableData.paginator);
      this.searchFilter();
    }
  }

  goToPage() {
    this.router.navigate(['add-user'], { relativeTo: this.route });
  }

  isUserEditable(value: string) {
    const isStringInArray = this.roles.some(obj => obj.value === value[0]);

    if (isStringInArray) {
      return true
    } else {
      return false
    }
  }

  showFilterPagination(paginator: MatPaginator) {
    if (paginator) {
      this.filteredTableData.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        length = Math.max(length, 0);
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        const startIndex = page * pageSize;
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return ``;
      };
    }

  }

  openDialog(row: ListUser, action: string, event?: MatSelectChange) {
    let title: string;
    let description: string;
    let okBtn: string;

    if (action === 'Delete') {
      title = 'Delete User?';
      description = 'This will remove the user immediately and you can’t undo this action.';
      okBtn = 'Delete';
    } else if (action === 'Update') {
      title = 'Confirm to proceed?';
      description = 'This will change to the new selected user role immediately';
      okBtn = 'Proceed';
    }

    const dialogRef = this.dialog.open(DialogPromptComponent, {
      panelClass: 'custom-dialog',
      maxWidth: '520px',
      autoFocus: false,
      disableClose: true,
      data: {
        title: title,
        icon: 'icon-danger-1',
        description: description,
        btnCancelLabel: 'Cancel',
        btnOkLabel: okBtn
      }
    });

    //subscribe to modal once button is clicked
    dialogRef.afterClosed().subscribe((result) => {
      /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
      if (result.result === 'ok' && action === 'Delete') {
        this.store.dispatch(DeleteUser({ username: row.username, role: row.groups[0] }));
        this.store.dispatch(administratorPortalInit({ pageIndex: 1 }));
      } else if (result.result === 'ok' && action === 'Update' && row.groups[0] !== event.value) {
        this.store.dispatch(UpdateUser({ username: row.username, role: event.value }));
        this.store.dispatch(administratorPortalInit({ pageIndex: 1 }));
      } else if (result === '' && action === 'Update' && row.groups[0] !== event.value) {
        this.store.dispatch(administratorPortalInit({ pageIndex: 1}));
      }
    })

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
