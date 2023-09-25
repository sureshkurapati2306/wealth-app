import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIndividualFundsComponent } from './table-individual-funds.component';

describe('TableIndividualFundsComponent', () => {
  let component: TableIndividualFundsComponent;
  let fixture: ComponentFixture<TableIndividualFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableIndividualFundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableIndividualFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
