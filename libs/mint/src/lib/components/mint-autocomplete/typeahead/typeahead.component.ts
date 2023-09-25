import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogTypeaheadMobileComponent } from '../../mint-dialog/dialog-typeahead-mobile/dialog-typeahead-mobile.component';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};
@Component({
  selector: 'cimb-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent implements OnInit, OnChanges, AfterViewInit {
  $XSmall;
  @Input() typeaheadOptions: any[] = [];
  @Input() typeaheadValue: string;
  @Input() typeaheadId?: string;
  @Input() typeaheadLabel: string;
  @Input() typeaheadPlaceholder;
  @Input() errorMessage?: string;
  @Input() isRequired?: boolean = true;
  @Input() typeaheadForm: FormGroup;
  @Input() typeaheadFormControlName: string;
  //disable typeahed control
  @Input() isDisabled?: boolean = false;
  //input needs when postCodes value change then states value shuld automatically clear
  @Input() postCodeChangeEvent;
  @Input() isTypeaheadLabel?: boolean = true;
  // grouping insustry
  @Input() isGroupDropdown?: boolean = false;
  @Output() optionSelectedEvent = new EventEmitter<any>();
  public filteredTypeaheadOptions: Observable<any[]>;
  isHandset$: Observable<boolean>;
  count = 0;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(
        map((result) => result.matches),
        tap(() => this.changeDetectorRef.detectChanges())
      );
  }

  ngOnInit() {
    this.isHandset$.subscribe((isHandset) => (this.$XSmall = isHandset));
    if (this.typeaheadForm) {
      this.typeaheadForm.addControl(
        this.typeaheadFormControlName,
        new FormControl('', [])
      );
    }
    if (this.isRequired && this.typeaheadForm && this.typeaheadForm.controls) {
      this.typeaheadForm.controls[this.typeaheadFormControlName].setValidators([
        autocompleteStringValidator(
          this.typeaheadOptions,
          this.typeaheadId,
          this.isGroupDropdown
        ),
        Validators.required,
      ]);
    }
    if (
      this.typeaheadForm &&
      this.typeaheadForm.get(this.typeaheadFormControlName)
    ) {
      this.filteredTypeaheadOptions = this.typeaheadForm
        .get(this.typeaheadFormControlName)
        .valueChanges.pipe(
          startWith(''),
          map((value) => this._filterLabels(value))
        );
    }
  }

  displayNames(label) {
    if (!this.isGroupDropdown) {
      if (label != '' && label) {
        if (this.typeaheadOptions) {
          if (
            this.typeaheadOptions.find(
              (option) => option[this.typeaheadId] === label
            )
          ) {
            return this.typeaheadOptions.find(
              (option) => option[this.typeaheadId] === label
            )[this.typeaheadValue];
          }
        }
      }
    } else {
      return label;
    }
  }

  isFormValid() {
    if (this.typeaheadForm && this.typeaheadForm.controls) {
      return (
        !this.typeaheadForm.controls[this.typeaheadFormControlName].valid &&
        this.typeaheadForm.controls[this.typeaheadFormControlName].touched
      );
    }
  }

  openPopup() {
    const dialogRef = this.dialog.open(DialogTypeaheadMobileComponent, {
      panelClass: ['full-width', 'mobile-typeahead-dialog'],
      maxWidth: '600px',
      width: '100%',
      // height:'0%',
      // margin-top:'20px',
      autoFocus: false,
      data: {
        mobileTypeaheadForm: this.typeaheadForm,
        mobilemobileTypeaheadPlaceholder: this.typeaheadPlaceholder,
        mobileTypeaheadFormControlName: this.typeaheadFormControlName,
        isGroupDropdown: this.isGroupDropdown,
        typeaheadOptions: this.typeaheadOptions,
        typeaheadValue: this.typeaheadValue,
        typeaheadId: this.typeaheadId,
        isDisabled: this.isDisabled,
        postCodeChangeEvent: this.postCodeChangeEvent,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null && result !== undefined) {
        this.optionSelectedEvent.emit(result);
        if (this.typeaheadForm && this.typeaheadForm.controls) {
          this.typeaheadForm.controls[this.typeaheadFormControlName].setValue(
            result
          );
        }
      }
    });
  }

  getValue() {
    if (this.isGroupDropdown) {
      if (this.typeaheadForm && this.typeaheadForm.controls) {
        return this.typeaheadForm.controls[this.typeaheadFormControlName].value;
      }
    } else {
      if (this.typeaheadForm && this.typeaheadForm.controls) {
        if (this.typeaheadForm.controls[this.typeaheadFormControlName].value) {
          const data = this.typeaheadOptions.filter(
            (value) =>
              value[this.typeaheadId] ===
              this.typeaheadForm.controls[this.typeaheadFormControlName].value
          );
          if (data.length > 0) {
            return data[0][this.typeaheadValue];
          }
        }
      }
    }
    return '';
  }

  ngOnChanges() {
    if (this.postCodeChangeEvent) {
      if (this.typeaheadOptions[0]) {
        if (this.typeaheadForm && this.typeaheadForm.controls) {
          if (
            this.typeaheadForm.controls[this.typeaheadFormControlName].value
          ) {
            this.typeaheadForm.controls[
              this.typeaheadFormControlName
            ].patchValue(this.typeaheadOptions[0].stateCode);
          }
        }
      }

      if (
        this.typeaheadForm &&
        this.typeaheadForm.get(this.typeaheadFormControlName)
      ) {
        this.filteredTypeaheadOptions = this.typeaheadForm
          .get(this.typeaheadFormControlName)
          .valueChanges.pipe(
            startWith(''),
            map((value) => this._filterLabels(value))
          );
      }
    }
    if (this.isRequired && this.typeaheadForm && this.typeaheadForm.controls) {
      this.typeaheadForm.controls[this.typeaheadFormControlName].setValidators([
        autocompleteStringValidator(
          this.typeaheadOptions,
          this.typeaheadId,
          this.isGroupDropdown
        ),
        Validators.required,
      ]);
    }
    if (!this.isDisabled && this.typeaheadForm && this.typeaheadForm.controls) {
      this.typeaheadForm.controls[this.typeaheadFormControlName].enable();
    }
    if (this.isDisabled && this.typeaheadForm && this.typeaheadForm.controls) {
      this.typeaheadForm.controls[this.typeaheadFormControlName].disable();
    }
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  private _filterLabels(label: string): any[] {
    if (this.typeaheadOptions) {
      if (this.isGroupDropdown) {
        if (label) {
          return this.typeaheadOptions
            .map((group) => ({
              letter: group.letter,
              names: _filter(group.names, label),
            }))
            .filter((group) => group.names.length > 0);
        }
        return this.typeaheadOptions;
      } else {
        if (label === '') {
          return this.typeaheadOptions.slice();
        }
        if (label) {
          const filterValue = label.toLowerCase();
          return this.typeaheadOptions
            .filter((option) =>
              (option[this.typeaheadValue].toLowerCase().includes(filterValue) || option[this.typeaheadId].toLowerCase().includes(filterValue))
            )
            .filter((country) =>
              (country[this.typeaheadValue].toLowerCase().startsWith(filterValue) || country[this.typeaheadId].toLowerCase().includes(filterValue))
            );
        }
      }
    }

    // typeahed filter value which contains user entered value
    // filter(option => option[this.typeaheadValue].toLowerCase().includes(filterValue))
    //typeahed filter value which  strts with user entered value
  }

  getSelectedOption(event) {
    this.optionSelectedEvent.emit(event.value);
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
          .find((obj) => obj.letter === control?.value?.split('-')[0].trim())
          ?.names.some((objVal) => objVal === control?.value)
      ) {
        return null;
      }
    } else {
      if (validOptions.some((objVal) => objVal[val] === control?.value)) {
        return null; /* valid option selected */
      }
    }
    return { invalidAutocompleteString: { value: control } };
  };
}
