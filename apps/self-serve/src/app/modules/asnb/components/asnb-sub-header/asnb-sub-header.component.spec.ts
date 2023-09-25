import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AsnbSubHeaderComponent } from './asnb-sub-header.component';
import { Router } from '@angular/router';
import { path } from '../../../../../app/shared/config/path';

describe('AsnbSubHeaderComponent', () => {
    let component: AsnbSubHeaderComponent;
    let fixture: ComponentFixture<AsnbSubHeaderComponent>;
    let mockRouter: Partial<Router>;

    beforeEach(async () => {
        mockRouter = {
            navigate: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AsnbSubHeaderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbSubHeaderComponent);
        component = fixture.componentInstance;
        component.asnbOverallInvestment = {
            name: '',
            uhId: '',
            currentInvestment: 0,
            lastUpdateDate: '',
        };
        component.asnbSummary = {
            alcName: '',
            alcSeq: 111,
            alDesc: '1111',
            alCode: '1111',
            alCategory: 'cat1',
            accountNumber: '232323232',
            amount: 1222,
            currencyCode: 'MYR',
            investmentLastUpdated: '',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update content.lastUpdate when ngOnChanges is called and content exists', () => {
        component.asnbOverallInvestment = {
            lastUpdateDate: '2023-05-25',
            name: 'Test Name',
            uhId: 'Test UH ID',
            currentInvestment: 100,
        };

        component.asnbSummary = {
            alcName: '',
            alcSeq: 111,
            alDesc: '1111',
            alCode: '1111',
            alCategory: 'cat1',
            accountNumber: '232323232',
            amount: 1222,
            currencyCode: 'MYR',
            investmentLastUpdated: '2023-06-13T08:25:06',
        };

        component.content = {
            title: 'Test Title',
            description: 'Test Description',
            goToWealthDashboardText: 'Test Go To Wealth Dashboard Text',
            lastUpdate: 'Last update 13 Jun 2023, 08:25 AM',
        };

        component.ngOnChanges();

        expect(component.content.lastUpdate).toBe('Last update 13 Jun 2023, 08:25 AM');
    });

    it('should not update content.lastUpdate when ngOnChanges is called and content is not defined', () => {
        component.asnbOverallInvestment = {
            lastUpdateDate: '2023-05-25',
            name: 'Test Name',
            uhId: 'Test UH ID',
            currentInvestment: 100,
        };

        component.content = undefined;

        component.ngOnChanges();

        expect(component.content).toBeUndefined();
    });

    it('should navigate to the wealth dashboard when goToWealthDashboard is called', () => {
        component.goToWealthDashboard();
    });
});
