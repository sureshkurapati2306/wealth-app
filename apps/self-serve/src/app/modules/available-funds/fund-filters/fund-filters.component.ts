import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { atLeastOne } from '@cimb/common';
import { EventService } from '@cimb/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AssetsClass, FundHouse, RiskCategory } from '../models';
import { sortData } from './fund-filters.data';

@Component({
    selector: 'cimb-fund-filters',
    templateUrl: './fund-filters.component.html',
    styleUrls: ['./fund-filters.component.scss'],
})
export class FundFiltersComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @ViewChild('filters') filters: TemplateRef<any>;
    @ViewChild('searchFilter') searchFilter: TemplateRef<any>;
    @ViewChild('toolTip') toolTip: TemplateRef<any>;
    @ViewChild('esgToolTip') esgToolTip: TemplateRef<any>;
    @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

    @Input() data: string[];
    @Input() riskCategories: Observable<RiskCategory[]>;
    @Input() fundHouse: Observable<FundHouse[]>;
    @Input() assetsClasses: Observable<AssetsClass[]>;

    @Output() optionSelected: EventEmitter<any> = new EventEmitter();
    @Output() applyFilters: EventEmitter<any> = new EventEmitter();

    filteredOptions: Observable<string[]>;
    myControl = new FormControl();
    highlightedText: string;
    sortData = sortData;
    selectedValue = '';
    totalFilterCount: number;
    fundName: string;
    enableClearBtn = true;

    filterForm: FormGroup = this.fb.group({
        riskControl: [null],
        fundHouseControl: [null],
        assetsClassesControl: [null],
        syariahCompliant: [null],
        esgFund: [null],
        sort: [null],
    });

    constructor(
        public _bottomSheet: MatBottomSheet,
        private _matDialog: MatDialog,
        private _eventService: EventService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.filterForm.setValidators(atLeastOne(Validators.required));
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => {
                return value.length >= 3 ? this._filter(value) : [];
            }),
        );
    }

    private _filter(value: string): string[] {
        this.highlightedText = value;
        const filterValue = value.toLowerCase();
        return this.data.filter((option) => option.toLowerCase().includes(filterValue));
    }

    onOptionSelected() {
        this.optionSelected.emit(this.myControl.value);
    }

    onValueChange() {
        this.selectedValue = this.myControl.value;
        if (this.myControl.value.length === 0) {
            this.optionSelected.emit();
        }
    }

    onClear() {
        this.myControl.setValue('');
        this.optionSelected.emit();
    }

    onSearch(value) {
        this.fundName = value;
        if (this.myControl.value.length > 0) {
            this.optionSelected.emit(value);
        }
        this.autocomplete.closePanel();
    }

    /* 
        Modal start here
    */

    openFilterModal() {
        this._matDialog.open(this.filters, {
            panelClass: 'mint-filter-panel',
        });
    }

    /* 
        Mobile filters config
        Set global object for filters
    */

    getMobileFilters() {
        const { riskControl, fundHouseControl, assetsClassesControl, syariahCompliant, esgFund, sort } =
            this.filterForm.value;

        const filters = {
            riskCategory: riskControl?.toString(),
            fundHouse: fundHouseControl?.toString(),
            assetClass: assetsClassesControl?.toString(),
            sort: sort,
            syariahCompliant: syariahCompliant ? 'I' : '',
            esgFund: esgFund ? 'Y' : '',
            fundName: this.fundName || this.myControl.value,
        };

        return filters;
    }

    onMobileFundNameOptionSelected() {
        this.selectedValue = this.myControl.value;
        const filters = this.getMobileFilters();
        this.applyFilters.emit(filters);
        this._bottomSheet.dismiss();
    }

    onMobileSearchFundName(value) {
        this.fundName = value;
        const filters = this.getMobileFilters();
        if (this.myControl.value.length > 0) {
            this.applyFilters.emit(filters);
            this._bottomSheet.dismiss();
        }
    }

    onMobileClearFundName() {
        this.myControl.setValue('');
        this.fundName = '';
        this.selectedValue = '';
        const filters = this.getMobileFilters();
        this.applyFilters.emit(filters);
        this._bottomSheet.dismiss();
    }

    onMobileClearFilters() {
        this.filterForm.reset();
        this.totalFilterCount = null;
        const filters = this.getMobileFilters();
        this.applyFilters.emit(filters);
        this.enableClearBtn = true;
        this.filterForm.markAsPristine();
    }

    onMobileApplyFilter() {
        const formValue = this.filterForm.value;
        const { syariahCompliant } = this.filterForm.value;
        const { esgFund } = this.filterForm.value;
        // Get total count from multi select filters
        const totalMultiSelections = Object.values(formValue).reduce(
            (a: any, v: any) => a + (Array.isArray(v) ? v.length : 0),
            0,
        );

        // Add + one in button badge if Syariah checked true
        if(syariahCompliant) {
            this.totalFilterCount = syariahCompliant
            ? +totalMultiSelections + 1
            : +totalMultiSelections;
        } else if(esgFund) {
            this.totalFilterCount = esgFund
            ? +totalMultiSelections + 1
            : +totalMultiSelections;
        }
        const filters = this.getMobileFilters();

        this.applyFilters.emit(filters);
        this.enableClearBtn = false;
        this._matDialog.closeAll();
    }

    openSearchFilter() {
        this._bottomSheet.open(this.searchFilter, {
            panelClass: ['mint-filter-action-sheet'],
        });
    }

    openEsgTooltipBottomSheet() {
        this._bottomSheet.open(this.esgToolTip, {
            panelClass: 'tooltip-action-sheet',
        });
    }
    openTooltipBottomSheet() {
        this._bottomSheet.open(this.toolTip, {
            panelClass: 'tooltip-action-sheet',
        });
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
