import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { DialogDropdownMobileComponent } from '../../mint-dialog/dialog-dropdown-mobile/dialog-dropdown-mobile.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};
@Component({
  selector: 'cimb-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.scss']
})
export class InputDropdownComponent implements OnInit, OnChanges {
  @ViewChild('mySelect') mySelect;
  @Input() isDropdownLabel?: boolean = true;
  @Input() dropdownLabel: string;
  @Input() isGroupDropdown?: boolean = false;
  @Input() dropdownPlaceholder: string;
  @Input() dropdownValue:string;
  @Input() dropdownId:string;
  @Input() isCountry:boolean;
  @Input() dropdownSelectValue: string;
  @Input() dropdownForm: FormGroup;
  @Input() dropdownFormControlName: string;
  @Input() selectOption: any[] = [];
  @Input() isRequired: boolean ;
  @Input() errorMessage: string;
  @Input() postCodeChangeEvent;
  @Output() optionSelectedEvent = new EventEmitter<any>();
  isHandset$: Observable<boolean>;
  public filteredDropdownOptions: Observable<any[]>;
  $XSmall;

  constructor(private changeDetectorRef: ChangeDetectorRef,public _bottomSheet: MatBottomSheet, public dialog: MatDialog, public breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(
        map((result) => result.matches),
        tap(() => this.changeDetectorRef.detectChanges())
      );
  }

  ngOnInit(): void {
    this.isHandset$.subscribe((isHandset) => (this.$XSmall = isHandset));
    if (this.dropdownForm) {
      this.dropdownForm.addControl(
        this.dropdownFormControlName,
        new FormControl('', [])
      );
    }
   
    if (this.isRequired && this.dropdownForm && this.dropdownForm.controls) {
      this.dropdownForm.controls[this.dropdownFormControlName].setValidators([
        autocompleteStringValidator(
          this.selectOption,
          this.dropdownId,
          this.isGroupDropdown
        ),
        Validators.required,
      ]);
    }
    if (
      this.dropdownForm &&
      this.dropdownForm.get(this.dropdownFormControlName)
    ) {
      this.filteredDropdownOptions = this.dropdownForm
        .get(this.dropdownFormControlName)
        .valueChanges.pipe(
          startWith(''),
          map((value) => this._filterLabels(value))
        );
    }
  }
  private _filterLabels(label: string): any[] {
    if (this.selectOption) {
      if (this.isGroupDropdown) {
        if (label) {
          return this.selectOption
            .map((group) => ({
              letter: group.letter,
              names: _filter(group.names, label),
            }))
            .filter((group) => group.names.length > 0);
        }
        return this.selectOption;
      } else {
        if (label === '') {
          return this.selectOption.slice();
        }
        if (label) {
          const filterValue = label.toLowerCase();
          return this.selectOption
            .filter((option) =>
              (option[this.dropdownValue].toLowerCase().includes(filterValue) || option[this.dropdownId].toLowerCase().includes(filterValue))
            )
            .filter((country) =>
              (country[this.dropdownValue].toLowerCase().startsWith(filterValue) || country[this.dropdownId].toLowerCase().includes(filterValue))
            );
        }
      }
    }
  }
  openPopup() {
    const dialogRef = this.dialog.open(DialogDropdownMobileComponent, {
      panelClass: ['full-width', 'mobile-dropdown-dialog'],
      maxWidth: '600px',
      width: '100%',
      autoFocus: false,
      data: {
        inputDropdown: true,
        mobileDropdownForm: this.dropdownForm,
        isGroupDropdown: this.isGroupDropdown,
        mobileDropdownPlaceholder: this.dropdownPlaceholder,
        mobiledropdownFormControlName: this.dropdownFormControlName,
        dropdownOptions: this.selectOption,
        dropdownValue: this.dropdownValue,
        dropdownId: this.dropdownId,
        // isDisabled: this.isDisabled,
        postCodeChangeEvent: this.postCodeChangeEvent,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null && result !== undefined) {
        this.optionSelectedEvent.emit(result);
        if (this.dropdownForm && this.dropdownForm.controls) {
          this.dropdownForm.controls[this.dropdownFormControlName].setValue(
            result
          );
        }
      }
    });
  }
  displayNames(label) {
    if (!this.isGroupDropdown) {
      if (label != '' && label) {
        if (this.selectOption) {
          if (
            this.selectOption.find(
              (option) => option[this.dropdownId] === label
            )
          ) {
            return this.selectOption.find(
              (option) => option[this.dropdownId] === label
            )[this.dropdownValue];
          }
        }
      }
    } else {
      return label;
    }
  }
  isFormValid() {
    if (this.dropdownForm && this.dropdownForm.controls) {
    return !this.dropdownForm.controls[this.dropdownFormControlName].valid && this.dropdownForm.controls[this.dropdownFormControlName].touched
    }

  }
  getValue() {
    if (this.isGroupDropdown) {
      if (this.dropdownForm && this.dropdownForm.controls) {
        return this.dropdownForm.controls[this.dropdownFormControlName].value;
      }
    }  else {
      if (this.dropdownForm && this.dropdownForm.controls) {
        if (this.dropdownForm.controls[this.dropdownFormControlName].value) {
          const data = this.selectOption.filter(
            (value) =>
              value[this.dropdownId] ===
              this.dropdownForm.controls[this.dropdownFormControlName].value
          );
          if (data.length > 0) {
            return data[0][this.dropdownValue];
          }
        }
      }
    }
    return '';
  }

  getSelectedOption(event) {
    this.optionSelectedEvent.emit(event.value);
  }

  ngOnChanges() {
    if (this.postCodeChangeEvent) {
      if (this.selectOption[0]) {
        if (this.dropdownForm && this.dropdownForm.controls) {
          if (
            this.dropdownForm.controls[this.dropdownFormControlName].value
          ) {
            this.dropdownForm.controls[
              this.dropdownFormControlName
            ].patchValue(this.selectOption[0].stateCode);
          }
        }
      }

      if (
        this.dropdownForm &&
        this.dropdownForm.get(this.dropdownFormControlName)
      ) {
        this.filteredDropdownOptions = this.dropdownForm
          .get(this.dropdownFormControlName)
          .valueChanges.pipe(
            startWith(''),
            map((value) => this._filterLabels(value))
          );
      }
    }
    if (this.isRequired && this.dropdownForm && this.dropdownForm.controls) {
      this.dropdownForm.controls[this.dropdownFormControlName].setValidators([
        autocompleteStringValidator(
          this.selectOption,
          this.dropdownId,
          this.isGroupDropdown
        ),
        Validators.required,
      ]);
    }
    if (this.dropdownForm && this.dropdownForm.controls) {
      this.dropdownForm.controls[this.dropdownFormControlName].enable();
    }
  }
}
function autocompleteStringValidator(
  validOptions: Array<any>,
  val,
  isGroupDropdown
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (isGroupDropdown) {
      if (
        validOptions
          .find((object) => object.letter === control?.value?.split('-')[0].trim())
          ?.names.some((objectVal) => objectVal === control?.value)
      ) {
        return null;
      }
    } else {
      if (validOptions.some((objectVal) => objectVal[val] === control?.value)) {
        return null; /* valid option selected */
      }
    }
    return { invalidAutocompleteString: { value: control } };
  };
}