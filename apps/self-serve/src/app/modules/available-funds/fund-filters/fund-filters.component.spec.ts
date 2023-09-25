import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HighlightTextPipe } from '@cimb/core';
import { of } from 'rxjs';

import { FundFiltersComponent } from './fund-filters.component';

class dialogMock {
    open() {
        return {
            afterClosed: () => of({}),
        };
    }
}

describe('FundFiltersComponent', () => {
    let component: FundFiltersComponent;
    let fixture: ComponentFixture<FundFiltersComponent>;
    let dialog: any;
    let bottomSheet: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FundFiltersComponent, HighlightTextPipe],
            imports: [
                MatBottomSheetModule,
                MatAutocompleteModule,
                MatDialogModule,
                ReactiveFormsModule,
            ],
            providers: [{ provide: MatDialog, useClass: dialogMock }],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FundFiltersComponent);
        dialog = TestBed.inject(MatDialog);
        bottomSheet = TestBed.inject(MatBottomSheet);
        component = fixture.componentInstance;
        component.data = ['abc123'];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should onOptionSelected', () => {
        expect(component.onOptionSelected()).toBeUndefined();
    });

    it('should onInput', () => {
        component.myControl.setValue(123);
        expect(component.onValueChange()).toBeUndefined();

        component.myControl.setValue('');
        expect(component.onValueChange()).toBeUndefined();
    });

    describe('onClear()', () => {
        it('Should clear control value', () => {
            component.myControl.setValue('');
            jest.spyOn(component.optionSelected, 'emit');
            component.onClear();

            expect(component.optionSelected.emit).toHaveBeenCalled();
        });
    });

    describe('onSearch()', () => {
        it('Should pass a value to parent component when onSearch', () => {
            component.fundName = 'FUND_NAME';
            component.myControl.setValue('FUND_NAME');
            jest.spyOn(component.optionSelected, 'emit');
            component.onSearch(component.fundName);

            expect(component.optionSelected.emit).toHaveBeenCalledWith(component.fundName);
        });
        it('Should not pass a value to parent component when fund name ', () => {
            component.fundName = 'FUND_NAME';
            component.myControl.setValue('');
            jest.spyOn(component.optionSelected, 'emit');
            component.onSearch(component.fundName);

            expect(component.optionSelected.emit).not.toHaveBeenCalled();
        });
    });

    describe('openFilterModal()', () => {
        it('Should open filter modal', () => {
            dialog.open = jest.fn();
            component.openFilterModal();
            expect(dialog.open).toBeCalledTimes(1);

            expect(dialog.open).toHaveBeenCalledWith(component.filters, {
                panelClass: 'mint-filter-panel',
            });
        });
    });

    describe('openTooltipBottomSheet()', () => {
        it('Should open tool tips', () => {
            bottomSheet.open = jest.fn();
            component.openTooltipBottomSheet();
            expect(bottomSheet.open).toBeCalledTimes(1);

            expect(bottomSheet.open).toHaveBeenCalledWith(component.toolTip, {
                panelClass: 'tooltip-action-sheet',
            });
        });
    });

    describe('openSearchFilter()', () => {
        it('Should open search filter', () => {
            bottomSheet.open = jest.fn();
            component.openSearchFilter();
            expect(bottomSheet.open).toBeCalledTimes(1);
        });
    });

    describe('onMobileClearFundName()', () => {
        it('Should empty fundName value', () => {
          component.onMobileClearFundName();
          component.myControl.setValue('');
          expect(component.fundName).toBe('');
          expect(component.selectedValue).toBe('')  
        });
    });

    describe('onMobileFundNameOptionSelected()', () => {
        it('Should empty fundName value', () => {
          component.onMobileFundNameOptionSelected();
          component.myControl.setValue('');
        });
    });

    describe('onMobileSearchFundName()', () => {
        it('Should empty fundName value', () => {
            component.fundName = 'FUND_NAME';
            component.myControl.setValue('FUND_NAME');
          component.onMobileSearchFundName('FUND_NAME');
          expect(component.fundName).toBe('FUND_NAME')
          jest.spyOn(component.applyFilters, 'emit');
          component.onMobileSearchFundName(component.fundName);

          expect(component.applyFilters.emit).toHaveBeenCalled();
          
        });
    });

    describe('onMobileClearFilters()', () => {
        it('Should clear filters on mobile view', () => {
          jest.spyOn(component.applyFilters, 'emit');
          component.onMobileClearFilters();
          expect(component.applyFilters.emit).toHaveBeenCalled();
          
        });
    });
});
