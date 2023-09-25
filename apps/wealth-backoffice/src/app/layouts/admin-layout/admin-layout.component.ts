/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Store } from '@ngrx/store';
import { DialogPromptComponent, MintOfficeSelectors } from '@cimb/mint-office';
import { DialogAlertComponent } from '@cimb/mint';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as authSelector from 'libs/mint-office/src/lib/mint-office-feature-login/+state/auth.selectors';
import * as AuthActions from 'libs/mint-office/src/lib/mint-office-feature-login/+state/auth.actions';
import * as CustomerSupportActions from 'libs/mint-office/src/lib/mint-office-feature-customer-support/+state/customer-support.actions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuditsService } from '@cimb/common';

@Component({
  selector: 'cimb-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  footerClassName$: Observable<string>;
  isAuthenticated = this.store.select(authSelector.isAuthenticated);
  dialogRef: MatDialogRef<DialogAlertComponent>;
  cifNumber: string;
  clientId: string;
  sessionId: number;
  idleTime = 270;
  timeoutCount = 30;
  idleState = 'NOT_STARTED';
  timedOut = false;

  constructor(
    private store: Store,
    public idle: Idle,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private auditsService: AuditsService
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
    this.store.select(authSelector.getJwt_session)
      .pipe(
        tap((data) => {
          if (data) {
            this.cifNumber = data.cifNumber;
            this.clientId = data.clientId;
            this.sessionId = data.sessionId;
          }

        })
      ).subscribe();

    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'NO_LONGER_IDLE';
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'TIMED_OUT';
      this.timedOut = true;
      this.dialog.closeAll();
      this.resetTimeOut();
      this.logoutEvent();
    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      this.openDialogWarning(this.timeoutCount);
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.dialogRef.componentInstance.dialogContent =
        '<p>Due to inactivity, you will be automatically logged out in </br> <b>' +
        countdown +
        ' seconds</b> for security. </p>';
    });

    this.idle.setIdle(this.idleTime);
    this.idle.setTimeout(this.timeoutCount);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.reset();
  }

  logout() {
    const dialogRef = this.dialog.open(DialogPromptComponent, {
      panelClass: ['custom-dialog', 'logout'],
      maxWidth: '520px',
      autoFocus: false,
      data: {
        title: 'Logout',
        icon: 'icon-danger-1',
        description: 'Are you sure you want to logout?',
        btnCancelLabel: 'Cancel',
        btnOkLabel: 'Logout'
      }
    });

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    dialogRef.afterClosed().subscribe((result) => {
      if (result.result === 'ok') {
        this.logoutEvent();
      }
    })
  }

  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  openDialogWarning(count: number) {
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.dialogRef = this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogHeading: 'Session Inactivity',
        dialogContent:
          '<p>Due to inactivity, you will be automatically logged out in </br> <b>' +
          count +
          ' seconds</b> for security. </p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Logout',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Continue Session',
        dialogImage: '<em class="icon-danger"></em>',
      },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Logout') {
        this.dialog.closeAll();
        this.resetTimeOut();
        this.logoutEvent();
      } else if (result === 'Continue Session') {
        this.dialog.closeAll();
        this.reset();
      } else {
        this.reset();
      }
    });
  }

  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  logoutEvent() {

    this.store.dispatch(AuthActions.delSession({ sessionId: this.sessionId }));
    this.store.dispatch(CustomerSupportActions.resetCustomerSupportState());
  }

  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  resetTimeOut() {
    this.idle.stop();
  }

  ngOnDestroy() {
    this.resetTimeOut();
  }

}
