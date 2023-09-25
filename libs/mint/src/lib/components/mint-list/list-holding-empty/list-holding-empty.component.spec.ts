import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';

import { ListHoldingEmptyComponent } from './list-holding-empty.component';

describe('ListHoldingEmptyComponent', () => {
  let component: ListHoldingEmptyComponent;
  let fixture: ComponentFixture<ListHoldingEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListHoldingEmptyComponent],
      imports: [ MatInputModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHoldingEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
