/* eslint-disable @typescript-eslint/no-empty-function */
import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import {
    FormControl,
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
} from '@angular/forms';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import * as _ from 'lodash';

@Component({
    selector: 'cimb-mint-multi-select-checkbox',
    templateUrl: './mint-multi-select-checkbox.component.html',
    styleUrls: ['./mint-multi-select-checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MintMultiSelectCheckboxComponent),
            multi: true,
        },
    ],
})
export class MintMultiSelectCheckboxComponent implements ControlValueAccessor {
    @Input() placeholder: string;
    @Input() data: any;
    @Output() selectionChange? = new EventEmitter<MatSelectChange>();

    @Output() selected = new EventEmitter<boolean>();

    @ViewChild('selection') select: MatSelect;
    allSelected = false;

    control = new FormControl();
    lodash = _;

    onTouch: () => void | undefined;

    registerOnTouched(fn: () => void) {
        this.onTouch = fn;
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

    onSelectionChange(event: MatSelectChange): any {
        this.selectionChange.emit(event);
    }

    handleSelectedOpt() {
        let optionSelected = false;

        this.select.options.forEach((item: MatOption) => {
            if (item.selected) {
                optionSelected = true;
            }
        });
        this.allSelected = optionSelected;

        this.selected.emit(this.allSelected);
    }
}
