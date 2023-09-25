import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from './tooltip.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

describe('TooltipComponent', () => {
    let component: TooltipComponent;
    let fixture: ComponentFixture<TooltipComponent>;
    let mockBottomSheet: Partial<MatBottomSheet>;

    beforeEach(async () => {
        mockBottomSheet = {
            open: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [TooltipComponent],
            providers: [{ provide: MatBottomSheet, useValue: mockBottomSheet }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TooltipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open bottomsheet when clicked on mobile', () => {
        component.openBottomSheet();
        expect(mockBottomSheet.open).toHaveBeenCalled();
    });
});
