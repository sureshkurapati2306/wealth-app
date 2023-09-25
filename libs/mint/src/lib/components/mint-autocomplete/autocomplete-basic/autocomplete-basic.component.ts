import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

interface AutocompleteOption {
    name: string;
    type: string;
    option: string[];
}

@Component({
    selector: 'cimb-autocomplete-basic',
    templateUrl: './autocomplete-basic.component.html',
    styleUrls: ['./autocomplete-basic.component.scss'],
})
export class AutocompleteBasicComponent implements OnInit, OnChanges {
    @Input() inputLabel: string;
    @Input() autocompletePlaceholder: string;
    @Input() hasLabel = true;
    @Input() autocompleteOption = [];
    @Input() autocompleteGroup: boolean;
    @Input() withButton = false;
    @Input() searchWrapper = false;
    @Input() isTypeAheadItems = false;
    @Input() accountOpeningFields = false;
    @Input() selectedValue;
    @Input() accountSelectedValue = '';
    @Output() optionSelectedEvent = new EventEmitter<string>();
    @Output() searchButtonClickEvent: EventEmitter<any> = new EventEmitter();
    @Output() searchButtonCloseEvent: EventEmitter<any> = new EventEmitter();

    customClass: string;
    switch = new FormControl();
    filteredOptions: Observable<AutocompleteOption[]>;

    toHighlight: string;
    isSearchFieldEmpty: boolean;
    switchValue: string;

    @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

    @ViewChild('inputAutoComplete') inputAutoComplete: any;

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
    ngOnChanges(changedObject: SimpleChanges): void {
        if (this.autocompleteOption != undefined && this.autocompleteOption.length > 0) {
            this.filteredOptions = this.switch.valueChanges.pipe(
                startWith(''),
                map((value) => {
                    return this._filter(value);
                }),
            );
        }

        if (
            this.accountOpeningFields &&
            changedObject.accountSelectedValue &&
            changedObject.accountSelectedValue.currentValue !==
                changedObject.accountSelectedValue.previousValue
        ) {
            if (this.accountSelectedValue.length) {
                /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
                // this.autocompleteOption.filter((option) => {
                //     if (
                //         this.accountSelectedValue === option.countryCode &&
                //         (this.autocompletePlaceholder == 'Nationality' ||
                //             this.autocompletePlaceholder == 'Select Nationality')
                //     ) {
                //         return this.switch.setValue(option.countryLongName);
                //     }

                //     if (
                //         this.accountSelectedValue === option.salutationCode &&
                //         this.autocompletePlaceholder == 'Title'
                //     ) {
                //         return this.switch.setValue(option.salutationLongName);
                //     }
                //     if (
                //         this.accountSelectedValue === option.occupationCode &&
                //         (this.autocompletePlaceholder == 'Profession' ||
                //             this.autocompletePlaceholder == 'Select Profession')
                //     ) {
                //         return this.switch.setValue(option.occupationLongName);
                //     }

                //     if (
                //         this.accountSelectedValue === option.employmentCode &&
                //         (this.autocompletePlaceholder == 'Industry' ||
                //             this.autocompletePlaceholder == 'Select Industry')
                //     ) {
                //         return this.switch.setValue(option.employmentShortName);
                //     }

                //     if (
                //         this.accountSelectedValue === option.countryCode &&
                //         (this.autocompletePlaceholder == 'Country' ||
                //             this.autocompletePlaceholder == 'Select Country')
                //     ) {
                //         return this.switch.setValue(option.countryLongName);
                //     }

                //     if (
                //         this.accountSelectedValue === option.stateLongName &&
                //         (this.autocompletePlaceholder == 'State' ||
                //             this.autocompletePlaceholder == 'Select State')
                //     ) {
                //         return this.switch.setValue(option.stateLongName);
                //     }

                //     if (
                //         this.accountSelectedValue === option.citizenId &&
                //         (this.autocompletePlaceholder == 'Citizen' ||
                //             this.autocompletePlaceholder == 'Select Citizen')
                //     ) {
                //         return this.switch.setValue(option.citizenLongName);
                //     }

                //     if (
                //         this.accountSelectedValue === option.raceCode &&
                //         (this.autocompletePlaceholder == 'Race' ||
                //             this.autocompletePlaceholder == 'Select Race')
                //     ) {
                //         return this.switch.setValue(option.raceLongName);
                //     }

                //     if (
                //         this.accountSelectedValue === option.religionCode &&
                //         (this.autocompletePlaceholder == 'Religion' ||
                //             this.autocompletePlaceholder == 'Select Religion')
                //     ) {
                //         return this.switch.setValue(option.religionLongName);
                //     }

                //     if (
                //         this.accountSelectedValue === option.maritalCode &&
                //         (this.autocompletePlaceholder == 'Marital Status' ||
                //             this.autocompletePlaceholder == 'Select Marital Status')
                //     ) {
                //         return this.switch.setValue(option.maritalLongName);
                //     }
                // });
            }
        }
    }
    ngOnInit() {
        this.isSearchFieldEmpty = true;
        this.filteredOptions = this.switch.valueChanges.pipe(
            startWith(''),
            map((value) => {
                return this._filter(value);
            }),
        );

        // this.switch.setValue(this.selectedValue);
        if (this.selectedValue != undefined && this.selectedValue.value != '') {
            this.switch.setValue(this.selectedValue.value);
        }

        // const s =  this.acountSelectedValueOptions.subscribe((value)=>{
        // this.switch.setValue(this.accountSelectedValue[0].value);
        // })
        //  this.switch.setValue(this.selectedValue);
    }

    onSearchButtonClick() {
        this.switchValue = this.switch.value;
        this.searchButtonClickEvent.emit(this.switch.value);
        this.autocomplete.closePanel();
    }
    populateSelectedValue(value) {
        const filterValue = this._normalizeValue(value);
        const results = this.autocompleteOption.filter((option) =>
            this._normalizeValue(option.countryLongName).includes(filterValue),
        );
        return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
    }

    private _filter(value: string): AutocompleteOption[] {
        const filterValue = this._normalizeValue(value);
        this.toHighlight = value;
        if (this.accountOpeningFields) {
            if (this.autocompletePlaceholder == 'Title') {
                const results = this.autocompleteOption.filter((option) =>
                    this._normalizeValue(option.salutationLongName).includes(filterValue),
                );
                return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            } else if (
                this.autocompletePlaceholder == 'Profession' ||
                this.autocompletePlaceholder == 'Select Profession'
            ) {
                const results = this.autocompleteOption.filter((option) =>
                    this._normalizeValue(option.occupationLongName).includes(filterValue),
                );
                return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            } else if (
                this.autocompletePlaceholder == 'Industry' ||
                this.autocompletePlaceholder == 'Select Industry'
            )
            // {
            // const results = this.autocompleteOption.filter((option) =>
            //         this._normalizeValue(option.employmentShortName).includes(filterValue),
            //     );
            //     return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            // } else if (
            //     this.autocompletePlaceholder == 'Nationality' ||
            //     this.autocompletePlaceholder == 'Select Nationality'
            // ) {
            //     const results = this.autocompleteOption.filter((option) =>
            //         this._normalizeValue(option.countryLongName).includes(filterValue),
            //     );
            //     return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            // } else if (
            //     this.autocompletePlaceholder == 'Country' ||
            //     this.autocompletePlaceholder == 'Select Country'
            // )
            {
                const results = this.autocompleteOption.filter((option) =>
                    this._normalizeValue(option.countryLongName).includes(filterValue),
                );
                return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            } else if (
                this.autocompletePlaceholder == 'State' ||
                this.autocompletePlaceholder == 'Select State'
            ) {
                const results = this.autocompleteOption.filter((option) =>
                    this._normalizeValue(option.stateLongName).includes(filterValue),
                );
                return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            } else if (
                this.autocompletePlaceholder == 'Citizen' ||
                this.autocompletePlaceholder == 'Select Citizen'
            ) {
                const results = this.autocompleteOption.filter((option) =>
                    this._normalizeValue(option.citizenLongName).includes(filterValue),
                );
                return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            } else if (
                this.autocompletePlaceholder == 'Race' ||
                this.autocompletePlaceholder == 'Select Race'
            ) {
                const results = this.autocompleteOption.filter((option) =>
                    this._normalizeValue(option.raceLongName).includes(filterValue),
                );
                return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            } else if (
                this.autocompletePlaceholder == 'Religion' ||
                this.autocompletePlaceholder == 'Select Religion'
            ) {
                const results = this.autocompleteOption.filter((option) =>
                    this._normalizeValue(option.religionLongName).includes(filterValue),
                );
                return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            } else if (
                this.autocompletePlaceholder == 'Marital Status' ||
                this.autocompletePlaceholder == 'Select Marital Status'
            ) {
                const results = this.autocompleteOption.filter((option) =>
                    this._normalizeValue(option.maritalLongName).includes(filterValue),
                );
                return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            } else if (this.autocompletePlaceholder == 'Settlement Account') {
                const results = this.autocompleteOption.filter((option) =>
                    this._normalizeValue(option.employmentShortName).includes(filterValue),
                );
                return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
            }
        } else {
            const results = this.autocompleteOption.filter((option) =>
                this._normalizeValue(option.name).includes(filterValue),
            );
            return results ? results : <any>this.autocompleteOption.push({ name: 'No Data' });
        }
    }

    private _normalizeValue(value: string): string {
        return value != undefined ? value.toLowerCase().replace(/\s/g, '') : null;
    }
    onSelectionChange(event) {
        this.switch.setValue(event.option.value);
        this.optionSelectedEvent.emit(event.option.value);
    }
    closeOptions() {
        this.autocomplete.closePanel();
    }

    _allowSelection(option: string): { [className: string]: boolean } {
        return {
            'no-data': option === 'No data',
        };
    }
    //After Closed Event
    autocompleteOpened() {
        setTimeout(() => {
            this.customClass = 'custom-autocomplete mat-menu-panel custom-menu-panel with-divider';
        }, 0);
    }
    //After Closed Event
    autocompleteClosed() {
        this.customClass = '';
    }
    resetValue() {
        this.switch.setValue('');
        this.searchButtonCloseEvent.emit();
        this.autocomplete.closePanel();
    }

    openOrClosePanel(evt: any, trigger: MatAutocompleteTrigger): void {
        evt.stopPropagation();
        if (trigger.panelOpen) {
            trigger.closePanel();
        } else {
            trigger.openPanel();
        }
    }
}
