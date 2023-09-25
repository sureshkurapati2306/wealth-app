import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbSummaryCardComponent } from './asnb-summary-card.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { getCheckout } from '../../+state/asnb.selectors';

describe('AsnbSummaryCardComponent', () => {
    let component: AsnbSummaryCardComponent;
    let fixture: ComponentFixture<AsnbSummaryCardComponent>;
    let mockStore: Partial<Store>;

    beforeEach(async () => {
        mockStore = { select: jest.fn().mockReturnValue(of({})) };
        await TestBed.configureTestingModule({
            declarations: [AsnbSummaryCardComponent],
            providers: [{ provide: Store, useValue: mockStore }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbSummaryCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set the component properties correctly', () => {
        const mockData = {
            fundId: 'fundId',
            fundName: 'Fund Name',
            fundType: 'fixed price',
            amount: 120,
            bankCharge: 10,
            total: 540,
            salesChargePercentage: '0.00',
            salesCharge: '0.00',
        };
        const selectSpy = jest.spyOn(mockStore, 'select').mockReturnValue(of(mockData));
        component.ngOnInit();

        expect(selectSpy).toHaveBeenCalledWith(getCheckout);
        expect(component.invoiceItems).toEqual([
            {
                name: 'Total sales charge (0.00%)',
                amount: '0.00',
                decimalFormat: '1.2-2',
                isNotAvailable: false,
            },
            {
                name: 'Total bank charge',
                amount: 10,
                decimalFormat: '1.2-2',
            },
            {
                name: 'Total net investment amount',
                amount: 120,
                decimalFormat: '1.2-2',
                isNotAvailable: false,
            },
        ]);
        expect(component.totalAmount).toBe(540);
        expect(component.fund.id).toBe('fundId');
        expect(component.fund.name).toBe('Fund Name');
        expect(component.fund.type).toBe('fixed price');
    });
});
