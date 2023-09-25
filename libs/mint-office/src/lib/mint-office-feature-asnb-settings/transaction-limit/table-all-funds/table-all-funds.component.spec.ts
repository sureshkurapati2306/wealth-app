import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAllFundsComponent } from './table-all-funds.component';

describe('TableAllFundsComponent', () => {
  let component: TableAllFundsComponent;
  let fixture: ComponentFixture<TableAllFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAllFundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAllFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
