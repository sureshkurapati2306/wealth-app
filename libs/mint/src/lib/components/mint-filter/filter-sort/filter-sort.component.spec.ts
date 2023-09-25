import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MintAutocompleteModule } from '../../mint-autocomplete/mint-autocomplete.module';

import { FilterSortComponent } from './filter-sort.component';

describe('FilterSortComponent', () => {
  let component: FilterSortComponent;
  let fixture: ComponentFixture<FilterSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterSortComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatMenuModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatBadgeModule,
        MintAutocompleteModule,
        MatButtonToggleModule,
      ],
      providers: [MatDialog],
      declarations: [FilterSortComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
