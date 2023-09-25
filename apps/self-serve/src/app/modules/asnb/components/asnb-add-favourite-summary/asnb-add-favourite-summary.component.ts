import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsnbFundTypeMaps, AsnbIdType, AsnbTransactionStatusMembershipDetail } from '../../models';
import { Subscription } from 'rxjs';
import {
    getAddFavouriteDetails,
    getFundTypesMap,
    getIdTypeList,
} from '../../+state/asnb.selectors';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../core/state/reducers';
import { clearAddFavouriteState } from '../../+state/asnb.actions';
import { AsnbService } from '../../services/asnb.service';

@Component({
    selector: 'cimb-asnb-add-favourite-summary',
    templateUrl: './asnb-add-favourite-summary.component.html',
    styleUrls: ['./asnb-add-favourite-summary.component.scss'],
})
export class AsnbAddFavouriteSummaryComponent implements OnInit, OnDestroy {
    membershipName = '';
    membershipDetails: AsnbTransactionStatusMembershipDetail[] = [];
    rawTimestamp = '';
    receiptFirstHalfItems: AsnbTransactionStatusMembershipDetail[] = [];
    receiptSecondHalfItems: AsnbTransactionStatusMembershipDetail[] = [];

    addFavouriteSubscription: Subscription;
    idTypesSubscription: Subscription;
    fundTypesSubscription: Subscription;
    addFavourite$ = this.store.select(getAddFavouriteDetails);
    idTypes$ = this.store.select(getIdTypeList);
    fundTypes$ = this.store.select(getFundTypesMap);

    constructor(
        private router: Router,
        private store: Store<fromStore.AppState>,
        private asnbService: AsnbService,
    ) {}

    ngOnInit(): void {
        let idTypes: AsnbIdType[] = [];
        let fundTypes: AsnbFundTypeMaps = {};
        this.idTypesSubscription = this.idTypes$.subscribe((data) => {
            idTypes = data;
        });
        this.fundTypesSubscription = this.fundTypes$.subscribe((data) => {
            fundTypes = data;
        });
        this.addFavouriteSubscription = this.addFavourite$.subscribe((data) => {
            const idType = idTypes.find((item) => item.id === data.idType).value;
            const fundName = fundTypes[data.fundCode].fundLongName;
            this.membershipName = data.nickname;
            this.membershipDetails = [
                { label: 'ASNB membership number', value: data.membershipNumber },
                { label: "Member's ID type", value: idType },
                { label: 'ID number', value: data.idNumber },
                { label: 'Fund name', value: fundName },
                { label: 'Relationship', value: data.relationship },
                { label: 'Bank reference no', value: `[Ref ${data.transactionId}]` },
            ];
            this.rawTimestamp = data.timestamp;
            this.receiptFirstHalfItems = [
                { label: 'Bank reference no', value: `REF ${data.transactionId}` },
                { label: 'Add to favourite', value: data.nickname },
                { label: 'ASNB membership number', value: data.membershipNumber },
                { label: idType, value: data.idNumber },
                { label: 'Relationship', value: data.relationship },
            ];
            this.receiptSecondHalfItems = [{ label: 'Fund name', value: fundName }];
        });
    }

    goToDashboard() {
        this.store.dispatch(clearAddFavouriteState());
        this.asnbService.updateTabIndex(1);
        this.router.navigate(['/asnb-dashboard']);
    }

    ngOnDestroy(): void {
        this.addFavouriteSubscription.unsubscribe();
        this.idTypesSubscription.unsubscribe();
        this.fundTypesSubscription.unsubscribe();
    }
}
