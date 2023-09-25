/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MintOfficeSelectors } from '@cimb/mint-office';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cimb-backoffice-layout',
  templateUrl: './backoffice-layout.component.html',
  styleUrls: ['./backoffice-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackofficeLayoutComponent implements OnInit {

  footerClassName$: Observable<string>;

  constructor(
     private store: Store,
     private cdr: ChangeDetectorRef
  ) { }
  
  ngOnInit(): void {
    this.footerClassName$ = this.store.select(MintOfficeSelectors.getCimbFooterClassName)
      .pipe(
        tap(() => {
          setTimeout(() => {            
            this.cdr.markForCheck();
          });
        })
      );
  }

}
