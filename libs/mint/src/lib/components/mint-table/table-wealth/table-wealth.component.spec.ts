import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWealthComponent } from './table-wealth.component';

describe('TableWealthComponent', () => {
  let component: TableWealthComponent;
  let fixture: ComponentFixture<TableWealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableWealthComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
