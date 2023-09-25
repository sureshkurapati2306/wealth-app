import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbAddFavouriteSummaryComponent } from './asnb-add-favourite-summary.component';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { clearAddFavouriteState } from '../../+state/asnb.actions';
import { AsnbAddFavourite, AsnbFundTypeMaps, AsnbIdType } from '../../models';
import {
    getAddFavouriteDetails,
    getFundTypesMap,
    getIdTypeList,
} from '../../+state/asnb.selectors';
import { AsnbService } from '../../services/asnb.service';

describe('AsnbAddFavouriteSummaryComponent', () => {
    let component: AsnbAddFavouriteSummaryComponent;
    let fixture: ComponentFixture<AsnbAddFavouriteSummaryComponent>;
    let router: Router;
    let mockStore: MockStore;
    let mockAsnbService: Partial<AsnbService>;

    beforeEach(async () => {
        mockAsnbService = {
            updateTabIndex: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
        };
        await TestBed.configureTestingModule({
            declarations: [AsnbAddFavouriteSummaryComponent],
            providers: [
                {
                    provide: Router,
                    useClass: class {
                        navigate = jest.fn();
                    },
                },
                provideMockStore(),
                { provide: AsnbService, useValue: mockAsnbService },
            ],
        }).compileComponents();
        router = TestBed.inject(Router);
        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbAddFavouriteSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should update the component properties correctly', () => {
        const idTypesMockData: AsnbIdType[] = [{ id: '3', value: 'NRIC' }];
        const fundTypesMockData: AsnbFundTypeMaps = {
            ASB: {
                fundId: 1,
                fundCode: 'ASB',
                fundShortName: 'ASB',
                fundLongName: 'Amanah Saham Bumiputera',
                fundType: 'fixed',
                fundStatus: 'active',
                amount: 1,
            },
        };
        const addFavouriteMockData: AsnbAddFavourite = {
            nickname: 'Benefactor Nickname',
            membershipNumber: '222233334444',
            fundCode: 'ASB',
            idType: '3',
            idNumber: '999999-44-2222',
            relationship: 'Friend',
            stageId: 'stage-id',
            transactionId: 'transaction-id',
            timestamp: '2023-08-08T20:19:36.897',
        };
        mockStore.overrideSelector(getIdTypeList, idTypesMockData);
        mockStore.overrideSelector(getFundTypesMap, fundTypesMockData);
        mockStore.overrideSelector(getAddFavouriteDetails, addFavouriteMockData);
        mockStore.refreshState();

        component.ngOnInit();
        expect(component.membershipName).toStrictEqual('Benefactor Nickname');
        expect(component.membershipDetails).toStrictEqual([
            { label: 'ASNB membership number', value: '222233334444' },
            { label: "Member's ID type", value: 'NRIC' },
            { label: 'ID number', value: '999999-44-2222' },
            { label: 'Fund name', value: 'Amanah Saham Bumiputera' },
            { label: 'Relationship', value: 'Friend' },
            { label: 'Bank reference no', value: `[Ref transaction-id]` },
        ]);
        expect(component.rawTimestamp).toStrictEqual('2023-08-08T20:19:36.897');
        expect(component.receiptFirstHalfItems).toStrictEqual([
            { label: 'Bank reference no', value: `REF transaction-id` },
            { label: 'Add to favourite', value: 'Benefactor Nickname' },
            { label: 'ASNB membership number', value: '222233334444' },
            { label: 'NRIC', value: '999999-44-2222' },
            { label: 'Relationship', value: 'Friend' },
        ]);
        expect(component.receiptSecondHalfItems).toStrictEqual([
            { label: 'Fund name', value: 'Amanah Saham Bumiputera' },
        ]);
    });

    it('should clear Add Favourite state and navigate to the dashboard', () => {
        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        const mockAsnbServiceSpy = jest.spyOn(mockAsnbService, 'updateTabIndex');
        component.goToDashboard();
        expect(dispatchSpy).toHaveBeenCalledWith(clearAddFavouriteState());
        expect(mockAsnbServiceSpy).toHaveBeenCalledWith(1);
        expect(router.navigate).toHaveBeenCalledWith(['/asnb-dashboard']);
    });

    it('should unsubscribe from the subscription on ngOnDestroy', () => {
        const addFavouriteSubscriptionSpy = jest.spyOn(
            component.addFavouriteSubscription,
            'unsubscribe',
        );
        const idTypesSubscriptionSpy = jest.spyOn(component.idTypesSubscription, 'unsubscribe');
        const fundTypesSubscriptionSpy = jest.spyOn(component.fundTypesSubscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(addFavouriteSubscriptionSpy).toHaveBeenCalledTimes(1);
        expect(idTypesSubscriptionSpy).toHaveBeenCalledTimes(1);
        expect(fundTypesSubscriptionSpy).toHaveBeenCalledTimes(1);
    });
});
