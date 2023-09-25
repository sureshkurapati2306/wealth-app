import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbInvestmentComponent } from './asnb-investment.component';
import { StoreModule } from '@ngrx/store';

describe('AsnbInvestmentComponent', () => {
    let component: AsnbInvestmentComponent;
    let fixture: ComponentFixture<AsnbInvestmentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AsnbInvestmentComponent],
            imports: [StoreModule.forRoot({})],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbInvestmentComponent);
        component = fixture.componentInstance;
        component.asnbOverallInvestment = {
            name: '',
            uhId: '',
            currentInvestment: 0,
            lastUpdateDate: '',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
