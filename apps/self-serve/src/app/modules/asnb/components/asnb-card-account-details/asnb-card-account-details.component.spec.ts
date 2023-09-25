import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsnbCardAccountDetailsComponent } from './asnb-card-account-details.component';

describe('AsnbCardAccountDetailsComponent', () => {
    let component: AsnbCardAccountDetailsComponent;
    let fixture: ComponentFixture<AsnbCardAccountDetailsComponent>;

    const mockIdType = {
        id: '3',
        value: 'new id',
    };
    const mockRelationship = {
        id: 'spouse',
        value: 'Spouse',
    };
    const mockFundType = {
        ASN: {
            fundId: 2,
            fundCode: 'ASN',
            fundShortName: 'ASN',
            fundLongName: 'ASN',
            fundType: '2',
            fundStatus: 'Active',
            amount: 1,
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AsnbCardAccountDetailsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbCardAccountDetailsComponent);
        component = fixture.componentInstance;
        component.accountDetails = {
            nickname: 'samplename',
            fundCode: 'ASN',
            membershipNumber: '3939939393',
            idType: '3',
            idNumber: '3333',
            relationship: 'spouse',
            stageId: 'e23243443408f',
            timestamp: '2023-08-03T10:09:05.954+00:00',
            transactionId: '7001230803000002',
        };
        component.idTypes = [mockIdType];
        component.relationships = [mockRelationship];
        component.fundTypes = mockFundType;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getIdTypeName', () => {
        const validOutput = component.getIdTypeName('3');
        expect(validOutput).toEqual(mockIdType.value);

        const emptyOutput = component.getIdTypeName('4');
        expect(emptyOutput).toEqual('-');
    });

    it('should call getRelationshipName', () => {
        const validOutput = component.getRelationshipName('spouse');
        expect(validOutput).toEqual(mockRelationship.value);

        const emptyOutput = component.getRelationshipName('siblings');
        expect(emptyOutput).toEqual('-');
    });

    it('should call getFundName', () => {
        const validOutput = component.getFundName('ASN');
        expect(validOutput).toEqual(mockFundType['ASN'].fundLongName);

        const emptyOutput = component.getFundName('ASB');
        expect(emptyOutput).toEqual('-');
    });
});
