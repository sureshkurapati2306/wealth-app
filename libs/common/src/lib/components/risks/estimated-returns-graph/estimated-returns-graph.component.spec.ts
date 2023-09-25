import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedReturnsGraphComponent } from './estimated-returns-graph.component';

describe('EstimatedReturnsGraphComponent', () => {
  let component: EstimatedReturnsGraphComponent;
  let fixture: ComponentFixture<EstimatedReturnsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatedReturnsGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedReturnsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
