import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsnbSourceOfFundWealthComponent } from './asnb-source-of-fund-wealth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getSofSowList } from '../../+state/asnb.selectors';

describe('AsnbSourceOfFundWealthComponent', () => {
    let component: AsnbSourceOfFundWealthComponent;
    let fixture: ComponentFixture<AsnbSourceOfFundWealthComponent>;
    let mockStore: MockStore;
    let mockMatDialogRef: Partial<MatDialogRef<AsnbSourceOfFundWealthComponent>>;

    const mockValue = [
        { id: 'SOF', value: 'Source of Fund' },
        { id: 'SOW', value: 'Source of Wealth' },
    ];

    beforeEach(async () => {
        mockMatDialogRef = {
            close: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [AsnbSourceOfFundWealthComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockMatDialogRef },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
                provideMockStore(),
            ],
        }).compileComponents();

        mockStore = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbSourceOfFundWealthComponent);
        component = fixture.componentInstance;
        mockStore.overrideSelector(getSofSowList, mockValue);
        fixture.detectChanges();
    });

    // Write your tests here

    it('should initialize component and form controls', () => {
        component.ngOnInit();

        expect(component.sourceOfWealthAndFunds).toEqual(mockValue);
        expect(component.sourceofWealthAndFundsData).toBeDefined();
        expect(component.showSofOthers).toBeFalsy();
        expect(component.showSowOthers).toBeFalsy();
        expect(component.isButtonEnabled).toBeFalsy();
        // Add more assertions as needed
    });

    it('should update isButtonEnabled for SOFSOW popup when form is updated', () => {
        component.data.showSow = true;
        component.sourceofWealthAndFundsData.get('sow').setValue('SOW');
        component.sourceofWealthAndFundsData.get('sof').setValue('SOF');

        component.ngOnInit();
        expect(component.isButtonEnabled).toBe(true);
    });

    it('should update isButtonEnabled for SOF popup when form is updated', () => {
        component.data.showSow = false;
        component.sourceofWealthAndFundsData.get('sof').setValue('SOF');

        component.ngOnInit();
        expect(component.isButtonEnabled).toBe(true);
    });

    it('should update isButtonEnabled for SOFSOW popup when form is updated with OTH', () => {
        component.data.showSow = true;
        component.sourceofWealthAndFundsData.get('sow').setValue('OTH');
        component.sourceofWealthAndFundsData.get('sowOthers').setValue('Other');
        component.sourceofWealthAndFundsData.get('sof').setValue('OTH');
        component.sourceofWealthAndFundsData.get('sofOthers').setValue('Other');

        component.ngOnInit();
        expect(component.isButtonEnabled).toBe(true);
    });

    it('should update isButtonEnabled for SOF popup when form is updated with OTH', () => {
        component.data.showSow = false;
        component.sourceofWealthAndFundsData.get('sof').setValue('OTH');
        component.sourceofWealthAndFundsData.get('sofOthers').setValue('Other');

        component.ngOnInit();
        expect(component.isButtonEnabled).toBe(true);
    });

    it('should handle selection of source of funds', () => {
        const selectedItem = { id: '1', label: 'Option 1', value: 'option1' };
        component.onSofSelect(selectedItem);

        expect(component.sourceofWealthAndFundsData.value.sof).toEqual('1');
    });

    it('should handle selection of source of wealth', () => {
        const selectedItem = { id: '2', label: 'Option 2', value: 'option2' };
        component.onSowSelect(selectedItem);

        expect(component.sourceofWealthAndFundsData.value.sow).toEqual('2');
    });

    it('should submit form data if button is enabled', () => {
        component.isButtonEnabled = true;
        component.onSubmit();
        expect(mockMatDialogRef.close).toHaveBeenCalledWith(
            component.sourceofWealthAndFundsData.value,
        );
    });

    it('should not submit form data if button is not enabled', () => {
        component.isButtonEnabled = false;
        component.onSubmit();
        expect(mockMatDialogRef.close).toHaveBeenCalledTimes(0);
    });

    it('should close the dialog', () => {
        component.onClose();
    });
});
