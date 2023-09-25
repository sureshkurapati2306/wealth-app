import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTermsAndConditionComponent } from './dialog-terms-and-condition.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogTermsAndConditionComponent', () => {
  let component: DialogTermsAndConditionComponent;
  let fixture: ComponentFixture<DialogTermsAndConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogTermsAndConditionComponent],
      imports: [MatTabsModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTermsAndConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
