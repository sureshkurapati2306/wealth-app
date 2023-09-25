import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAsnbConsentComponent } from './dialog-asnb-consent.component';

describe('DialogAsnbConsentComponent', () => {
  let component: DialogAsnbConsentComponent;
  let fixture: ComponentFixture<DialogAsnbConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAsnbConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAsnbConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
