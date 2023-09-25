/* eslint-disable @typescript-eslint/no-empty-function */
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, forwardRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'cimb-mint-single-select',
    templateUrl: './mint-single-select.component.html',
    styleUrls: ['./mint-single-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MintSingleSelectComponent),
            multi: true,
        },
    ],
})
export class MintSingleSelectComponent implements ControlValueAccessor {
    @ViewChild('singleSelectionForMobile') singleSelectionForMobile: TemplateRef<any>;
    @ViewChild(MatSelect) matSelect: MatSelect;
    @Input() placeholder: string;
    @Input() data: any;
    control = new FormControl();
    mediaQueryList: MediaQueryList;

    constructor(public _bottomSheet: MatBottomSheet, mediaMatcher: MediaMatcher) {
        this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
    }

    onTouchedd: () => void | undefined;

    registerOnTouched(fn: () => void) {
        this.onTouchedd = fn;
    }

    writeValue(v: any) {
        this.control.setValue(v, { emitEvent: true });
    }

    registerOnChange(fn: (v: any) => void) {
        this.control.valueChanges.subscribe((val) => {
            fn(val);
        });
    }

    setDisabledState(fn) {
        return fn;
    }

    onSingleSelect(e) {
        this.control.setValue(e.source._value);
        this._bottomSheet.dismiss();
    }

    openSingleSelectForMobile() {
        if (this.mediaQueryList.matches) {
            this.matSelect.close();
            this._bottomSheet.open(this.singleSelectionForMobile, {
                panelClass: 'bottomSheet',
            });
        }
    }
}
