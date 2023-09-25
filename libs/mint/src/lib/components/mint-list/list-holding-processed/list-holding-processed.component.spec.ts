import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';

import { ListHoldingProcessedComponent } from './list-holding-processed.component';

describe('ListHoldingProcessedComponent', () => {
  let component: ListHoldingProcessedComponent;
  let fixture: ComponentFixture<ListHoldingProcessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListHoldingProcessedComponent],
      imports: [ MatInputModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHoldingProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
