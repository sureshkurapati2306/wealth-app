import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { AsnbProspectusSalesChargeComponent } from './asnb-prospectus-sales-charge.component';
import { Store } from '@ngrx/store';

describe('AsnbProspectusSalesChargeComponent', () => {
    let component: AsnbProspectusSalesChargeComponent;
    let fixture: ComponentFixture<AsnbProspectusSalesChargeComponent>;
    let storeMock: Partial<Store>;

    beforeEach(async () => {
        storeMock = {
            select: jest.fn().mockReturnValueOnce({
                subscribe: jest.fn().mockImplementation((callback) => {
                    const data = {
                        prospectus: 'Link 1',
                        fundPrice: 'Link 2',
                    };
                    callback(data);
                }),
            }),
            subscribe: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [AsnbProspectusSalesChargeComponent],
            providers: [
                {
                    provide: MatDialog,
                    useValue: {},
                },
                { provide: Store, useValue: storeMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AsnbProspectusSalesChargeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
