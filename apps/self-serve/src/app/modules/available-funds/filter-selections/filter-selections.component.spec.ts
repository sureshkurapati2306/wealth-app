import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { FilterSelectionsComponent } from './filter-selections.component';

describe('FilterSelectionsComponent', () => {
    let component: FilterSelectionsComponent;
    let fixture: ComponentFixture<FilterSelectionsComponent>;
    let bottomSheet: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilterSelectionsComponent],
            imports: [MatBottomSheetModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterSelectionsComponent);
        bottomSheet = TestBed.inject(MatBottomSheet);
        component = fixture.componentInstance;
        fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('registerOnTouched',() => {
        const onTouchedSpy = jest.fn();
        component.registerOnTouched(onTouchedSpy);
        expect(component.onTouched).toBe(onTouchedSpy);
    });

    it('setDisabledState',() => {
        jest.spyOn(component,'setDisabledState');
        component.setDisabledState('disabled');
        expect(component.setDisabledState).toHaveBeenCalled();
    });

    it('Should open tool tips', () => {
        bottomSheet.open = jest.fn();
        component.onOpenSelection();
        expect(bottomSheet.open).toBeCalledTimes(1);

        expect(bottomSheet.open).toHaveBeenCalledWith(component.selectionTemplate, {
            panelClass: 'mint-filter-action-sheet',
        });
    });

    it('registerOnTouched',() => {
        jest.spyOn(component,'registerOnTouched');
        component.registerOnTouched(():any => {
            return;
        });
        expect(component.registerOnTouched).toHaveBeenCalled();
    });

    it('writeValue',() => {
        jest.spyOn(component,'writeValue');
        component.writeValue(():any => {
            return;
        });
        expect(component.writeValue).toHaveBeenCalled();
    });

    it('registerOnChange',() => {
        jest.spyOn(component,'registerOnChange');
        component.registerOnChange(():any => {
            return;
        });
        expect(component.registerOnChange).toHaveBeenCalled();
    });

    it('onFundSelectionChange',() => {
        const selection = {source : {_value : "2343.23"}}
        expect(component.onFundSelectionChange(selection)).toBeUndefined();

    });

});
