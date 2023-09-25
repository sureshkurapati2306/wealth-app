import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationBoundsIndicatorComponent } from './pagination-bounds-indicator.component';

describe('PaginationBoundsIndicatorComponent', () => {
  let component: PaginationBoundsIndicatorComponent;
  let fixture: ComponentFixture<PaginationBoundsIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationBoundsIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationBoundsIndicatorComponent);
    component = fixture.componentInstance;
    component.totalRecords = 10;
    component.currentPageNumber = 1;
    component.itemsPerPage = 5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
