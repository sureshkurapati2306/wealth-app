/* eslint-disable @typescript-eslint/no-empty-function */
import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
    selector: 'cimb-filter-selections',
    templateUrl: './filter-selections.component.html',
    styleUrls: ['./filter-selections.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FilterSelectionsComponent),
            multi: true,
        },
    ],
})
export class FilterSelectionsComponent implements ControlValueAccessor {
    @ViewChild('selectionTemplate') selectionTemplate: TemplateRef<any>;
    @Input() label: string;
    @Input() placeholder: string;
    @Input() selections: any[];
    @Output() selectedOption: EventEmitter<any> = new EventEmitter();

    control = new FormControl();
    totalSelectionOption: number;
    selectionOption;

    constructor(public _bottomSheet: MatBottomSheet) {}

    onChanged: () => void | undefined;
    onTouched: () => void | undefined;

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    writeValue(value: any) {
        this.control.setValue(value, { emitEvent: true });
        value?.length
            ? (this.totalSelectionOption = value.length)
            : (this.totalSelectionOption = 0);
    }

    registerOnChange(fn: (v: any) => void) {
        this.control.valueChanges.subscribe((val) => {
            fn(val);
        });
    }

    setDisabledState(fn) {
        return fn;
    }

    onOpenSelection() {
        this._bottomSheet.open(this.selectionTemplate, {
            panelClass: 'mint-filter-action-sheet',
        });
    }

    onFundSelectionChange(selection) {
        this.totalSelectionOption = selection.source._value.length;
    }
}
