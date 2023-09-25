import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/state/reducers';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { LocationStrategy } from '@angular/common';
import { Idle } from '@ng-idle/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface PeriodicElement {
    referenceNo: string;
    transactionType: string;
    dateTime: string;
    fundName: string;
    status: string;
    amount: string;
    details1: string;
    units: string;
}

@Component({
    selector: 'cimb-transaction-logout-page',
    templateUrl: './transaction-logout-page.component.html',
    styleUrls: ['./transaction-logout-page.component.scss'],
})
export class TransactionLogoutPageComponent implements OnInit {
    private userObservable: Observable<any>;
    private subscription: Subscription;
    dateTime;
    date;
    seconds;
    minute;
    hours;
    LoginSession;
    currentTime;

    dateTimeTransction;
    cartData: any;
    referenceNumber: any;
    storeTransactionArray = [];
    multipleTransaction = [];
    displayedColumns: string[] = ['dateTime', 'referenceNo', 'fundName', 'status', 'amount'];
    dataSource;
    transactionArray: Array<any>;
    isTimeout: any;
    loginTime: number;
    headerLogoUrl = environment.apiUrl + environment.wealth + '/image/category/1';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: LocationStrategy,
        private store: Store<fromStore.AppState>,
        private idle: Idle,
        private snackbar: MatSnackBar,
    ) {
        this.snackbar.dismiss();
        idle.stop();
        history.pushState(null, null, window.location.href);
        this.location.onPopState(() => {
            history.pushState(null, null, window.location.href);
        });
    }

    ngOnInit(): void {
        this.isTimeout = this.route.snapshot.paramMap.get('isTimeout');

        const userObservable$ = this.store.select('userReducer');
        userObservable$
            .pipe(
                map((res) => {
                    this.loginTime = res.loginTime;
                }),
            )
            .subscribe();

        this.dateTime = new Date();
        this.currentTime = Date.now();
        this.LoginSession = this.currentTime - this.loginTime;
        const seconds = Math.floor((this.LoginSession / 1000) % 60);
        const minutes = Math.floor((this.LoginSession / (1000 * 60)) % 60);
        const hours = Math.floor((this.LoginSession / (1000 * 60 * 60)) % 24);
        this.hours = hours < 10 ? '0' + hours : hours;
        this.minute = minutes < 10 ? '0' + minutes : minutes;
        this.seconds = seconds < 10 ? '0' + seconds : seconds;
        this.LoginSession = this.hours + 'h' + ' ' + this.minute + 'm' + ' ' + this.seconds + 's';
        this.userObservable = this.store.select('cartReducer');
        this.subscription = this.userObservable.subscribe((data) => {
            this.displayData(data.storeTransaction);
        });
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    displayData(storeTransaction) {
        const storeTransactions = [...storeTransaction];
        const transactionArray = [];
        for (let i = 0; i < storeTransactions.length; i++) {
            const displayObject = storeTransactions[i];
            const displayItem = {
                referenceNo: displayObject.referenceNumber,
                transactionType: displayObject.transactionType,
                dateTime: displayObject.transactionDt + ' at ' + displayObject.transactionTmSs,
                fundName: displayObject.fundName,
                toFundName: displayObject?.toFundName,
                status: displayObject.transactionStatusName,
                details1: null,
                amount: displayObject.payableAmount,
                units: displayObject.transactionUnit,
                transactionTypeCode: displayObject.transactionCode,
                purchaseType: displayObject.purchaseType === 'ASNB' ? 'ASNB' : 'Unit Trust',
            };
            transactionArray.push({ ...displayItem });
        }
        this.storeTransactionArray = [...transactionArray];
        const storedTransactionTableData = this.storeTransactionArray.map((data) => ({
            ...data,
            dateTime: data.dateTime.replace('at', ''),
        }));
        const ELEMENT_DATA: PeriodicElement[] = storedTransactionTableData;
        const storedTransactionMobiledata = this.storeTransactionArray.map((data) => ({
            ...data,
            dateTime: data.dateTime.replace(' at', ','),
        }));
        this.transactionArray = storedTransactionMobiledata;
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    }
}
