import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbsPath } from '../core/models/breadcrumbs-path.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { loadWhitelistingList, deleteWhitelistingUser } from './+state/whitelisting-user.actions'
import { Store } from '@ngrx/store';
import { WhitelistingTable, ContentItem } from '../core/models/user-whitelisting.models'
import { Subject } from 'rxjs';
import { selectWhitelistingTable } from './+state/whitelisting-user.selectors'
import { takeUntil, skip, delay } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { DialogPromptComponent } from '../mint-office-ui-dialog/dialog-prompt/dialog-prompt.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'cimb-office-feature-user-whitelisting',
  templateUrl: './mint-office-feature-user-whitelisting.component.html',
  styleUrls: ['./mint-office-feature-user-whitelisting.component.scss']
})
export class MintOfficeFeatureUserWhitelistingComponent implements OnInit {

  searchForm: FormGroup;
  tableData: WhitelistingTable;
  dataSource: ContentItem[] = [];

  length : number;
  pageIndex : number;
  pageSize : number
  pageSizeOptions = [20];
  pageEvent: PageEvent;
  disabled = false;
  currentPageIndex = 1;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  breadcrumbsPaths: BreadcrumbsPath[] = [
    {
      label: 'USER WHITELISTING',
      url: null
    }
  ];

  displayedColumns: string[] = [
    'NO.',
    'START DATE',
    'END DATE',
    'NAME',
    'ID TYPE',
    'ID NO.',
    'PRODUCT(S)',
    'PRIVILEGE',
    'LAST UPDATED',
    'ACTION'
  ];

  filteredTableData : MatTableDataSource<ContentItem>;
  _unsubscribeAll: Subject<void> = new Subject<void>();
  loadingState = '';

  constructor(private fb: FormBuilder,
    private store: Store,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private router: Router, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) {
      this.searchForm = this.fb.group({
        searchKey: ['']
      });
  }

  ngOnInit(): void {
    this.getWhiteListedUser(1);
  }

  getWhiteListedUser(pageIndex : number) {
    this.store.dispatch(loadWhitelistingList({ search: '', pageIndex: pageIndex }));
    this.loadingState = 'success';
    this.store
      .select(selectWhitelistingTable)
      .pipe(
        skip(1),
        takeUntil(this._unsubscribeAll)
      ).subscribe((data) => {
        if (data) {
          this.tableData = data;
          this.dataSource = data?.content;
          this.length = data?.totalElements;
          this.pageSize= data?.pageable.pageSize;
          this.pageIndex = data?.pageable.pageNumber;
          this.cdr.detectChanges();
          this.filteredTableData = new MatTableDataSource<ContentItem>(data?.content);
        }
      });
  }

  handlePageEvent(e: PageEvent) {
    this.store.dispatch(loadWhitelistingList({ search: '', pageIndex: e.pageIndex +1 }));
    this.currentPageIndex = e.pageIndex +1;
  }

  searchFilter() {
    const searchKey: string = this.searchForm.value.searchKey;
    this.store.dispatch(loadWhitelistingList({ search: searchKey, pageIndex: 1 }));
  }

  checkSearchKey(value: string): void {
    if(value === '') {
      this.searchFilter();
    }
  }

  clearFilter() {
    this.searchForm = this.fb.group({
      searchKey: ['']
    });
    this.store.dispatch(loadWhitelistingList({ search: '', pageIndex: 1 }));
  }

  goToPage() {
    this.router.navigate(['add-new'], { relativeTo: this.route });
  }

  openDialog(row: ContentItem) {
    const dialogRef = this.dialog.open(DialogPromptComponent, {
      panelClass: 'custom-dialog',
      maxWidth: '520px',
      autoFocus: false,
      disableClose: true,
      data: {
        title: 'Delete User?',
        icon: 'icon-danger-1',
        description: 'This will remove the whitelisted user immediately and you can’t undo this action.',
        btnCancelLabel: 'Cancel',
        btnOkLabel: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.result === 'ok') {
        this.store.dispatch(deleteWhitelistingUser({ id: row.id }));
        delay(1000);
        this.getWhiteListedUser(this.currentPageIndex);
      }
    })
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'MM/dd/yyyy');
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
