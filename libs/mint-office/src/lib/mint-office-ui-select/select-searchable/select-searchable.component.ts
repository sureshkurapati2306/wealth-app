import { Component, ChangeDetectionStrategy, Input, Optional, Self, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'cimb-office-select-searchable',
  templateUrl: './select-searchable.component.html',
  styleUrls: ['./select-searchable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { 
      provide: MatFormFieldControl, 
      useExisting: SelectSearchableComponent 
    }
  ]
})
export class SelectSearchableComponent implements ControlValueAccessor, MatFormFieldControl<any>, OnDestroy {
  
  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private cdr: ChangeDetectorRef
  ) {

    this.filteredOptions = this.filterControl.valueChanges.pipe(
      startWith(null),
      map((label: string | null) => {
        return label ? this._filter(label) : this.options.slice()
      })
    );

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

  }

  static nextId = 0;
  
  empty = false;
  shouldLabelFloat = true;
  required = false;
  errorState = false;
  focused = false;
  stateChanges = new Subject<void>();
  controlType = 'mat-form-field-type-select-searchable';
  id = `select-searchable-input-${SelectSearchableComponent.nextId++}`;
  
  touched = false;
  disabled = false;

  value: string[] = [];

  selectedLabels: string[] = [];

  filterControl = new FormControl();

  filteredOptions: Observable<SelectOption[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() options: SelectOption[] = [];

  @Input() placeholder = '';

  @Input() label = '';

  @Input() panelClass = '';

  @Input() multiple = false;

  @ViewChild('filterInput') filterInput: ElementRef<HTMLInputElement>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDescribedByIds(ids: string[]): void { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onContainerClick(event: MouseEvent): void { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
 onChange: (_: string[]) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  writeValue(selected: string[]) {

    this.value = selected;

    this.selectedLabels = this.options.filter(option => {
      return this.value.includes(option.value);
    }).map(option => option.label);

    this.cdr.markForCheck();
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  add(event: MatChipInputEvent): void {
    const value = event.value

    // Check if we can add the typed in value
    if (value) {
      const foundAndNotAdded = this.options.find(item => {

        const added = this.selectedLabels.some(label => label.toLowerCase() === value.toLowerCase());

        return item.label.toLowerCase() === value.toLowerCase() && !added;

      });

      if(foundAndNotAdded) {
        this.selectedLabels = [...this.selectedLabels, foundAndNotAdded.label];
      }
    }

    this.mapLabelsToValues();

    // Clear the input value
    event.chipInput.clear();
    this.filterControl.setValue(null);
  }

  remove(item: string): void {
    const index = this.selectedLabels.indexOf(item);

    if (index >= 0) {
      this.selectedLabels.splice(index, 1);
    }

    this.mapLabelsToValues();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    
    const added = this.selectedLabels.some(label => label.toLowerCase() === value.toLowerCase());

    if(!added) {
      this.selectedLabels = [...this.selectedLabels, value];
    } else {
      this.remove(value);
    }

    this.mapLabelsToValues();

    this.filterInput.nativeElement.value = '';
    this.filterControl.setValue(null);
  }

  private _filter(value: string): SelectOption[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(item => {
      return item.label.toLowerCase().includes(filterValue)
    });
  }

  mapLabelsToValues() {

    this.value = this.options.filter(option => {
      return this.selectedLabels.includes(option.label);
    }).map(option => option.value);

    this.onChange(this.value);
    this.markAsTouched();
    this.stateChanges.next();

  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }
  
}
