import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AsnbTabDashboardComponent } from './asnb-tab-dashboard.component';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { asnbFavouriteDetails, asnbFunds, members } from '../../mocks/data';
import { ASNB_COMPONENTS } from '../../asnb-routing.module';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AsnbService } from '../../services/asnb.service';
import { AsnbFavouriteList, AsnbMember, ScheduledMaintenance } from '../../models';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Setting } from '@cimb/shared/models';
import { getSelectedMember } from '../../+state/asnb.selectors';
import { of } from 'rxjs';

describe('AsnbTabDashboardComponent', () => {
    let component: AsnbTabDashboardComponent;
    let asnbServiceMock: Partial<AsnbService>;
    let fixture: ComponentFixture<AsnbTabDashboardComponent>;
    let dialogMock: Partial<MatDialog>;

    let mockStore;

    beforeEach(async () => {
        asnbServiceMock = {
            getAsnbFavourites: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
            updateTabIndex: jest.fn(),
            tabIndex$: of(0),
            getAsnbSettings: jest.fn(),
            favList$: of(null),
        };

        dialogMock = { open: jest.fn() };

        mockStore = {
            select: jest.fn(() =>
                of({
                    fund1: { paramText: 'Fund 1' },
                    fund2: { paramText: 'Fund 2' },
                    fund3: { paramText: 'Fund 3' },
                }),
            ),
            dispatch: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [AsnbTabDashboardComponent, ASNB_COMPONENTS],
            imports: [
                MaterialModule,
                RouterTestingModule,
                NoopAnimationsModule,
                StoreModule.forRoot({}),
                HttpClientModule,
            ],
            providers: [
                {
                    provide: MatDialog,
                    useValue: dialogMock,
                },
                { provide: Store, useValue: mockStore },
                { provide: AsnbService, useValue: asnbServiceMock },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbTabDashboardComponent);
        component = fixture.componentInstance;
        component.fixedFunds = asnbFunds.fix_price;
        component.variableFunds = asnbFunds.variable_price;
        component.asnbMemberList = members;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get asnb favourite list when changed to favourite tab', async () => {
        const mock: AsnbFavouriteList = {
            asnbFavouriteDetails: [asnbFavouriteDetails],
            totalAsnbFavourites: 1,
            totalPages: 1,
        };

        component.ngOnInit();
        component.onTabChange({ index: 1, tab: null });

        const updateIndexSpy = jest.spyOn(asnbServiceMock, 'updateTabIndex');
        expect(updateIndexSpy).toHaveBeenCalledWith(1);

        const getAsnbFavouritesSpy = jest
            .spyOn(asnbServiceMock, 'getAsnbFavourites')
            .mockReturnValue(of(mock));

        component.getAsnbFavoriteList(1);

        await new Promise<void>((resolve) => setTimeout(resolve));

        expect(getAsnbFavouritesSpy).toHaveBeenCalled();
        expect(component.asnbFavouritesList).toEqual(mock);
    });

    it('should update selectedIndex when tabIndex$ emits', () => {
        const index = 2;

        asnbServiceMock.tabIndex$ = of(index);
        component.ngAfterViewInit();
        expect(component.selectedIndex).toEqual(index);
    });

    it('should call getAsnbFavouriteList when favList$ emits', () => {
        const spy = jest.spyOn(component, 'getAsnbFavoriteList');

        asnbServiceMock.favList$ = of(null, null);
        component.ngAfterViewInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should set hideVpTopUp when hideVpTop in settings is disabled for guardian', () => {
        const mock: Setting = {
            description: "Show 'VP fund component - major' at ASNB dashboard",
            enabled: false,
            utSettingGroupId: '10',
            utSettingId: '105',
        };

        jest.spyOn(asnbServiceMock, 'getAsnbSettings').mockReturnValue(of(mock));

        component.ngOnInit();

        expect(component.hideVpTopUp).toEqual({
            message: '',
            status: true,
        });
    });

    it('should set hideVpTopUp when hideVpTop in settings is enabled for guardian', () => {
        const mock: Setting = {
            description: "Show 'VP fund component - major' at ASNB dashboard",
            enabled: true,
            utSettingGroupId: '10',
            utSettingId: '105',
        };

        jest.spyOn(asnbServiceMock, 'getAsnbSettings').mockReturnValue(of(mock));

        component.ngOnInit();

        expect(component.hideVpTopUp).toEqual({
            message: '',
            status: false,
        });
    });

    it('should set hideVpTopUp when hideVpTop in settings is disabled for minor', () => {
        //mock selectedasnbmember from store
        const mockMember: AsnbMember = {
            name: 'test',
            membershipNumber: '123456789',
            value: '123456789',
        };

        const selectSpy = jest.spyOn(mockStore, 'select').mockReturnValue(of(mockMember));
        expect(selectSpy).toHaveBeenCalledWith(getSelectedMember);

        const mock: Setting = {
            description: "Show 'VP fund component - minor' at ASNB dashboard",
            enabled: false,
            utSettingGroupId: '10',
            utSettingId: '106',
        };

        jest.spyOn(asnbServiceMock, 'getAsnbSettings').mockReturnValue(of(mock));

        component.ngOnInit();

        expect(component.hideVpTopUp).toEqual({
            message: '',
            status: true,
        });
    });

    it('should open operation hour dialog when click on add new investment and hideTopUp is true', () => {
        const spy = jest.spyOn(component, 'openOperationHourDialog');
        component.hideTopUp = {
            message: '',
            status: true,
        };
        component.onAddNewInvestment();
        expect(spy).toHaveBeenCalled();
    });

    it('should redirect to available funds page if not between schedule maintenance and within operation hours', () => {
        const spy = jest.spyOn(component, 'onAddNewInvestment');
        component.hideTopUp = {
            message: '',
            status: false,
        };
        component.onAddNewInvestment();
        expect(spy).toHaveBeenCalled();
    });

    it('should redirect to schedule maintenance page if between schedule maintenance and within operation hours', () => {
        Date.now = jest.fn(() => new Date('2023-01-01T13:00:00.000+08:00').getTime());
        const mockScheduledMaintenance: ScheduledMaintenance = {
            dataPresent: 'Yes',
            startTime: '12:00:00',
            startDate: '2023-01-01',
            endTime: '14:00:00',
            endDate: '2023-01-01',
        };

        jest.spyOn(mockStore, 'select')
            .mockReturnValue(of(mockScheduledMaintenance))
            .mockReturnValueOnce(of(mockScheduledMaintenance));

        const spy = jest.spyOn(component, 'onAddNewInvestment');

        component.hideTopUp = {
            message: '',
            status: false,
        };

        component.onAddNewInvestment();

        expect(spy).toHaveBeenCalled();
    });

    it('isAsnbScheduledMaintenance should return false if scheduled maintenance is not between start and end date', () => {
        Date.now = jest.fn(() => new Date('2023-01-01T13:00:00.000+08:00').getTime());
        const mockScheduledMaintenance: ScheduledMaintenance = {
            dataPresent: 'Yes',
            startTime: '12:00:00',
            startDate: '2023-01-02',
            endTime: '14:00:00',
            endDate: '2023-01-02',
        };

        jest.spyOn(mockStore, 'select')
            .mockReturnValue(of(mockScheduledMaintenance))
            .mockReturnValueOnce(of(mockScheduledMaintenance));

        const result = component.isAsnbScheduledMaintenance();

        expect(result).toBeFalsy();
    });

    it('should redirect to schedule maintenance page if between schedule maintenance and within operation hours', () => {
        Date.now = jest.fn(() => new Date('2023-01-01T13:00:00.000+08:00').getTime());
        const mockScheduledMaintenance: ScheduledMaintenance = {
            dataPresent: 'Yes',
            startTime: '12:00:00',
            startDate: '2023-01-01',
            endTime: '14:00:00',
            endDate: '2023-01-01',
        };

        jest.spyOn(mockStore, 'select')
            .mockReturnValue(of(mockScheduledMaintenance))
            .mockReturnValueOnce(of(mockScheduledMaintenance));

        const spy = jest.spyOn(component, 'onAddNewInvestment');

        component.hideTopUp = {
            message: '',
            status: false,
        };

        component.onAddNewInvestment();

        expect(spy).toHaveBeenCalled();
    });
});
