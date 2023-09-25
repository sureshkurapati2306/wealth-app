import { ComponentFixture, TestBed } from '@angular/core/testing';

import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogTermsAndConditionContentComponent } from './dialog-terms-and-condition-content.component';

describe('DialogTermsAndConditionContentComponent', () => {
  let component: DialogTermsAndConditionContentComponent;
  let fixture: ComponentFixture<DialogTermsAndConditionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogTermsAndConditionContentComponent],
      imports: [MatTabsModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTermsAndConditionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
