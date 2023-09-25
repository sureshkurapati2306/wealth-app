import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsnbTransactionStatusCardTemplateComponent } from './asnb-transaction-status-card-template.component';
import * as pdfMake from 'pdfmake/build/pdfmake';

describe('AsnbTransactionStatusCardTemplateComponent', () => {
    let component: AsnbTransactionStatusCardTemplateComponent;
    let fixture: ComponentFixture<AsnbTransactionStatusCardTemplateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AsnbTransactionStatusCardTemplateComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbTransactionStatusCardTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should generate pdf', () => {
        component.receiptFirstHalfItems = [
            { label: 'Label 1', value: 'Value 1' },
            { label: 'Label 2', value: 'Value 2' },
        ];
        component.receiptSecondHalfItems = [
            { label: 'Label 1', value: 'Value 1' },
            { label: 'Label 2', value: 'Value 2' },
        ];
        const pdfCreateMock = jest.spyOn(pdfMake, 'createPdf');
        component.generatePdf();
        expect(pdfCreateMock).toHaveBeenCalled();
    });

    it('should return error code and message when errorCode exist', () => {
        component.errorCode = 'error_code';
        component.errorMessage = 'error_message';
        const result = component.getErrorCodeAndMessage();
        expect(result).toBe('Error code: error_code [error_message]');
    });

    it('should return pending color on getReceiptStatusColor', () => {
        component.status = 'Pending';
        const result = component.getReceiptStatusColor();
        expect(result).toBe('#ffab00');
    });

    it('should return success color on getReceiptStatusColor', () => {
        component.status = 'Successful';
        const result = component.getReceiptStatusColor();
        expect(result).toBe('#36b37e');
    });
});
