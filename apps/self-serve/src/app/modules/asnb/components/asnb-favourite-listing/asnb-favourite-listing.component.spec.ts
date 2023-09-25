import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbFavouriteListingComponent } from './asnb-favourite-listing.component';
import {
    ASNBScheduledDowntimeInfo,
    AsnbFavourite,
    AsnbFavouriteList,
    AsnbFundListing,
} from '../../models';
import { RouterTestingModule } from '@angular/router/testing';
import { SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { asnbFavouriteDetails } from '../../mocks/data';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { DowntimeService } from 'apps/self-serve/src/app/core/services/downtime/downtime.service';
import { of } from 'rxjs';
import { getAllFundsListing } from '../../+state/asnb.selectors';

describe('AsnbFavouriteListingComponent', () => {
    let component: AsnbFavouriteListingComponent;
    let fixture: ComponentFixture<AsnbFavouriteListingComponent>;
    let mockRouter: Partial<Router>;
    let mockStore: MockStore;
    let mockMatDialog: Partial<MatDialog>;
    let mockDowntimeService: Partial<DowntimeService>;

    const favouriteListing: AsnbFavouriteList = {
        asnbFavouriteDetails: [asnbFavouriteDetails],
        totalAsnbFavourites: 1,
        totalPages: 1,
    };

    beforeEach(async () => {
        mockRouter = {
            navigate: jest.fn(),
        };

        mockMatDialog = {
            open: jest.fn(),
        };

        mockDowntimeService = {
            getASNBScheduledDowntime: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule],
            declarations: [AsnbFavouriteListingComponent],
            providers: [
                provideMockStore(),
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockMatDialog },
                { provide: DowntimeService, useValue: mockDowntimeService },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbFavouriteListingComponent);
        component = fixture.componentInstance;
        component.favouriteList = favouriteListing;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit pageChange event when onPageClick is called', () => {
        const spy = jest.spyOn(component.pageChange, 'emit');
        const event = { pageIndex: 1 } as any;
        component.onPageClick(event);
        expect(spy).toHaveBeenCalledWith(1);
    });

    it('should generate pagination heading when generatePaginationHeading is called', () => {
        component.pageSize = 10;
        component.currentPage = 0;
        component.generatePaginationHeading();
        expect(component.paginationHeading).toEqual('Showing 1-1 of 1 favourite account(s)');
    });

    it('should initialize pagination when initializePagination is called', () => {
        component.pageSize = 10;
        component.favouriteList.totalAsnbFavourites = 1;
        component.initializePagination();
        expect(component.startIndex).toEqual(1);
        expect(component.endIndex).toEqual(1);
        expect(component.paginationHeading).toEqual('Showing 1-1 of 1 favourite account(s)');
    });

    it('should set endIndex to pageSize when totalAsnbFavourites is larger than pageSize', () => {
        component.pageSize = 10;
        component.favouriteList.totalAsnbFavourites = 11;
        component.initializePagination();
        expect(component.endIndex).toEqual(10);
    });

    it('should perform correct operation when onPurchaseClick is called', () => {
        const event = {
            no: 1,
            nickname: 'nickname1',
            fundCode: 'fund1',
            fundDesc: 'fund1',
            beneClientId: 'clientid1',
            relationship: 'relationship1',
            memberIdType: 'idtype1',
            asnbAccountNo: 'asnbaccount1',
        } as AsnbFavourite;
        const mockUpcomingDowntimeResponse: ASNBScheduledDowntimeInfo = {
            scheduledMaintenance: {
                dataPresent: 'Yes',
                startTime: '13:43:13',
                startDate: '2023-08-16',
                endTime: '14:30:13',
                endDate: '2023-08-16',
            },
            maintenanceStartTime: '1:43:13 PM',
            maintenanceEndTime: '2:30:13 PM',
            hasScheduledMaintenance: true,
        };
        const mockEmptyDowntimeResponse: ASNBScheduledDowntimeInfo = {
            scheduledMaintenance: {
                dataPresent: 'No',
                startTime: '',
                startDate: '',
                endTime: '',
                endDate: '',
            },
            maintenanceStartTime: '',
            maintenanceEndTime: '',
            hasScheduledMaintenance: false,
        };

        component.disablePurchaseNonOperation = false;
        jest.spyOn(mockDowntimeService, 'getASNBScheduledDowntime').mockReturnValue(
            of(mockUpcomingDowntimeResponse),
        );
        component.onPurchaseClick(event);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/asnb-dashboard/scheduled-maintenance']);

        jest.spyOn(mockDowntimeService, 'getASNBScheduledDowntime').mockReturnValue(
            of(mockEmptyDowntimeResponse),
        );
        const spy = jest.spyOn(mockStore, 'dispatch');
        component.onPurchaseClick(event);
        expect(spy).toHaveBeenCalledWith({
            type: '[Asnb/Favourite] Asnb Favourite Purchase',
            payload: event,
        });
        expect(mockRouter.navigate).toHaveBeenCalledWith([
            '/asnb-dashboard/asnb-favourite-purchase',
        ]);

        component.disablePurchaseNonOperation = true;
        component.onPurchaseClick(event);
        expect(mockMatDialog.open).toHaveBeenCalledTimes(1);
    });

    it('should return correct range label when getRangeLabel is called', () => {
        const page = 0;
        const pageSize = 10;
        const length = 1;
        component.getRangeLabel(page, pageSize, length);
        expect(component.startIndex).toEqual(1);
        expect(component.endIndex).toEqual(1);
    });

    it('should scroll to top when favouriteList is changed', () => {
        const changes: SimpleChanges = {
            favouriteList: {
                previousValue: null,
                currentValue: favouriteListing,
                firstChange: true,
                isFirstChange: () => true,
            },
        };

        const spy = jest.spyOn(window, 'scrollTo');
        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalledWith(0, 0);
    });

    it('should open fund suspend dialog when openSuspendFundDialog is called', () => {
        const spy = jest.spyOn(mockMatDialog, 'open');
        component.openSuspendFundDialog();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should initialize fund listing with store value on init', () => {
        const mockData: AsnbFundListing[] = [
            {
                amount: 0,
                fundCode: 'fund1',
                fundId: 'fund1',
                fundShortName: 'fund1',
                fundLongName: 'fund1',
                fundStatus: 'SUSPEND',
                fundType: 'fund1',
            },
        ];
        const selectSpy = jest.spyOn(mockStore, 'select').mockReturnValue(of(mockData));
        component.ngOnInit();
        expect(selectSpy).toHaveBeenCalledWith(getAllFundsListing);
        expect(component.fundListing).toEqual(mockData);
    });

    it('should open fund suspend dialog when on purchase click and fund is suspended', () => {
        //mock downtime not present
        const mockUpcomingDowntimeResponse: ASNBScheduledDowntimeInfo = {
            scheduledMaintenance: {
                dataPresent: 'No',
                startTime: '',
                startDate: '',
                endTime: '',
                endDate: '',
            },
            maintenanceStartTime: '',
            maintenanceEndTime: '',
            hasScheduledMaintenance: false,
        };

        jest.spyOn(mockDowntimeService, 'getASNBScheduledDowntime').mockReturnValue(
            of(mockUpcomingDowntimeResponse),
        );

        const mockData: AsnbFundListing[] = [
            {
                amount: 0,
                fundCode: 'ASB',
                fundId: 'fund1',
                fundShortName: 'fund1',
                fundLongName: 'fund1',
                fundStatus: 'SUSPEND',
                fundType: 'fund1',
            },
        ];
        const selectSpy = jest.spyOn(mockStore, 'select').mockReturnValue(of(mockData));
        component.ngOnInit();
        expect(selectSpy).toHaveBeenCalledWith(getAllFundsListing);
        expect(component.fundListing).toEqual(mockData);

        const spy = jest.spyOn(mockMatDialog, 'open');
        component.onPurchaseClick(asnbFavouriteDetails);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
