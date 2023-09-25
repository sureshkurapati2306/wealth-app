import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAsnbLinkErrorComponent } from './dialog-asnb-link-error.component';

describe('DialogAsnbLinkErrorComponent', () => {
  let component: DialogAsnbLinkErrorComponent;
  let fixture: ComponentFixture<DialogAsnbLinkErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAsnbLinkErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAsnbLinkErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
