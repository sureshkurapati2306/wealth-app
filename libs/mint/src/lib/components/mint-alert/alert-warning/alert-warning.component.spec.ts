import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertWarningComponent } from './alert-warning.component';

describe('AlertWarningComponent', () => {
  let component: AlertWarningComponent;
  let fixture: ComponentFixture<AlertWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertWarningComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
