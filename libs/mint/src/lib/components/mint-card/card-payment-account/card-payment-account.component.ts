import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

// export interface accountList {
//   name: string;
//   account: string;
//   accountNumber: string;
//   isActive: boolean;
//   hasJointAccount: boolean;
// }

export interface AccountList {
    accountNumber: string;
    accountType: string;
    account_status: string;
    casa_account_balance: number;
    casa_account_format: string;
    casa_account_name: string;
    curCode: number;
    joint_indicator: string;
    resStatus: string;
    settlementAcctType: string;
    signingCondition: string;
    signing_condition: string;
    staffInd: string;
    isActive: boolean;
    name: string;
    casa_account_no: string;
    isSufficientAmount: boolean;
}
@Component({
    selector: 'cimb-card-payment-account',
    templateUrl: './card-payment-account.component.html',
    styleUrls: ['./card-payment-account.component.scss'],
})
export class CardPaymentAccountComponent implements OnInit {
    @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

    // accountLists: accountList[];

    account = new FormControl('', [Validators.required]);

    filteredOptions: Observable<string[]>;

    isActiveState = false;
    isInActiveSelected = false;
    isJointAndAccountSelected = false;
    @Input() isExternalError = false;

    @Input() externalErrorMsg: string;
    @Input() cardAccountTitle: string;

    @Input() cardAccountSelectionPlaceholder: string;
    @Input() accountLists: AccountList[];
    @Output() accountselected: EventEmitter<any> = new EventEmitter();
    @Input() selectedAccount: -1;

    customClass: string;

    toHighlight = '';

    @Input() isForAsnb = false;

    ngOnInit() {
        if (this.selectedAccount && this.selectedAccount >= 0) {
            const name = this.accountLists[this.selectedAccount].casa_account_format;
            this.account.patchValue(name);
            this.getAccount(name);
        }

        this.filteredOptions = this.account.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value)),
        );
    }

    private _filter(value: string): any[] {
        const filterValue = this._normalizeValue(value);
        this.toHighlight = value;

        const propertyToFilter = 'casa_account_format';

        const results = this.accountLists.filter((option) =>
            this._normalizeValue(option[propertyToFilter]).includes(filterValue));

        return results.length ? results : ['No data'];
    }

    private _normalizeValue(value: string): string {
        return value?.toString()?.toLowerCase()?.replace(/\s/g, '') ?? value;
    }

    closeOptions() {
        this.autocomplete.closePanel();
    }

    _allowSelection(option: string): { [className: string]: boolean } {
        return {
            'no-data': option === 'No data',
        };
    }

    getAccount(account) {
        let selectedItem;
        const funds = this.accountLists.filter((item) => {
            return item.casa_account_format === account;
        });

        funds.forEach((item) => {
            if (item.account_status === 'Active') {
                this.isInActiveSelected = false;
            } else {
                this.isInActiveSelected = true;
            }
            if (item.joint_indicator === 'J' && (item.signingCondition === 'JoinAnd' || item.signing_condition === 'JoinAnd')) {
                this.isJointAndAccountSelected = true;
                this.isActiveState = true;
            } else {
                this.isJointAndAccountSelected = false;
                this.isActiveState = false
            }
            if (item.casa_account_format === account) {
                selectedItem = item;
            }
        });
        this.accountselected.emit({ ...selectedItem });
    }
    //After Closed Event
    autocompleteOpened() {
        setTimeout(() => {
            this.customClass =
                'custom-autocomplete mat-menu-panel custom-menu-panel with-divider filter-panel account-panel';
        }, 0);
    }
    //After Closed Event
    autocompleteClosed() {
        this.customClass = '';
    }

    inputDownArrowClick(event) {
        this.filteredOptions = this.account.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value)),
        );
        setTimeout(() => {
            this.autocomplete.openPanel();
        }, 100);

        this.autocompleteOpened();
    }

    goToConsumerContactCentreLink() {
        window.open(
            'https://www.cimb.com.my/en/personal/help-support/contact-us.html',
            '_blank',
        );
    }
}
