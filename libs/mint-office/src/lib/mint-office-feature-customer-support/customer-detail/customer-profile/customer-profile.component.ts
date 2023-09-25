import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as CustomerSupportSelectors from '../../+state/customer-support.selectors';
import { Customer, CustomerAccount } from '../../../core/models/customer.model';

@Component({
    selector: 'cimb-office-customer-profile',
    templateUrl: './customer-profile.component.html',
    styleUrls: ['./customer-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class CustomerProfileComponent implements OnInit {
    csRecord$: Observable<Customer>;

    dataSource = new MatTableDataSource<CustomerAccount>([]);

    columnsToDisplay: string[] = ['accNumber', 'accType', 'accName', 'status'];

    statusLabels = {
        A: 'Active',
        C: 'Closed',
        D: 'Deleted',
        PA: 'Pledge Active',
        PC: 'Pledge Close',
        PS: 'Pledge Suspend',
        UP: 'Unpledged',
        S: 'Suspended',
    };

    accountList = [];

    constructor(private store: Store, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.csRecord$ = this.store.select(CustomerSupportSelectors.selectCustomerDetail).pipe(
            tap((data) => {
                //prep data source for customer accounts based on API results
                for (const Index of Object.keys(data.accountList)) {
                    const customer: CustomerAccount = {
                        utAccountNo: '',
                        accountType: '',
                        accountName: '',
                        accountStatus: '',
                    };
                    customer.utAccountNo = data.accountList[Index].utAccountNo;
                    customer.accountType = data.accountList[Index].accountType;
                    customer.accountName = data.accountName;
                    customer.accountStatus =
                        this.statusLabels[data.accountList[Index].accountStatus] || '-';

                    this.accountList.push(customer);
                }
                this.dataSource = new MatTableDataSource<CustomerAccount>(this.accountList);
                // this.dataSource = new MatTableDataSource<CustomerAccount>([
                //   {
                //     utAccountNo: data.utAccountNo,
                //     accountType: 'Unit Trust',
                //     accountName: data.accountName,
                //     accountStatus: this.statusLabels[data.accountStatus] || '-'
                //   }
                // ]);
            }),
        );
    }
}
