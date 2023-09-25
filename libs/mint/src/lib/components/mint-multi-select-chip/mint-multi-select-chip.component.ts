/* eslint-disable @typescript-eslint/no-empty-function */
import { MediaMatcher } from '@angular/cdk/layout';
import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Input,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { isArray } from 'lodash-es';

@Component({
    selector: 'cimb-mint-multi-select-chip',
    templateUrl: './mint-multi-select-chip.component.html',
    styleUrls: ['./mint-multi-select-chip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MintMultiSelectChipComponent),
            multi: true,
        },
    ],
})
export class MintMultiSelectChipComponent implements ControlValueAccessor {
    @ViewChild('multiSelectionForMobile') multiSelectionForMobile: TemplateRef<any>;
    @ViewChild(MatSelect) matSelect: MatSelect;
    @Input() placeholder: string;
    @Input() data: any;
    @Input() multiple = false;
    control = new FormControl();
    mediaQueryList: MediaQueryList;

    constructor(public _bottomSheet: MatBottomSheet, mediaMatcher: MediaMatcher) {
        this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
        this.checkMobile();
    }

    onTouchh: () => void | undefined;

    registerOnTouched(fn: () => void) {
        this.onTouchh = fn;
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

    optionNames(ids: number[]): string[] {
        const array = isArray(ids) ? ids : [ids];
        return array.map((id) => {
            return this.data?.find((t) => t.id == id);
        });
    }

    onSelectedChipRemoved(selectedValue: string) {
        const values = this.control.value as string[];
        this.removeFirst(values, selectedValue);
        this.control.setValue(values);
    }

    private removeFirst<T>(array: T[], toRemove: T): void {
        const index = array.indexOf(toRemove);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }

    onMultiSelect(e) {
        this.control.setValue(e.source._value);
    }

    onSingleSelect(e) {
        this.control.setValue(e.source._value);
        this._bottomSheet.dismiss();
    }

    openMultiSelectForMobile() {
        if (this.mediaQueryList.matches) {
            this.matSelect.close();
            this._bottomSheet.open(this.multiSelectionForMobile, {
                panelClass: 'bottomSheet',
            });
        }
    }

    onSelectionChange(event: MatSelectChange) {
        if (!this.multiple) {
            this.matSelect.close();
            if (!this.mediaQueryList.matches) {
                // console.log('this.control.setValue([event.value])', this.control.setValue([event.value]))
                this.control.setValue([event.value])
            }
        }
    }

    checkMobile() {
        if (this.mediaQueryList.matches && this.multiple) {
            return true;
        } else if (this.mediaQueryList.matches && !this.multiple) {
            return true;
        } else if (!this.mediaQueryList.matches && !this.multiple) {
            return false;
        } else if (!this.mediaQueryList.matches && this.multiple) {
            return true;
        }
    }
}
