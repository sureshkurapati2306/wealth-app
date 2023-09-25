import { ComponentFixture, TestBed } from '@angular/core/testing';

import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogTermsAndConditionConventionalContentComponent } from './dialog-terms-and-condition-conventional-content.component';

describe('DialogTermsAndConditionConventionalContentComponent', () => {
  let component: DialogTermsAndConditionConventionalContentComponent;
  let fixture: ComponentFixture<DialogTermsAndConditionConventionalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogTermsAndConditionConventionalContentComponent],
      imports: [MatTabsModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTermsAndConditionConventionalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
