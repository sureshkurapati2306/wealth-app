import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOtpLinkAsnbComponent } from './dialog-otp-link-asnb.component';

describe('DialogOtpLinkAsnbComponent', () => {
  let component: DialogOtpLinkAsnbComponent;
  let fixture: ComponentFixture<DialogOtpLinkAsnbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOtpLinkAsnbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOtpLinkAsnbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
