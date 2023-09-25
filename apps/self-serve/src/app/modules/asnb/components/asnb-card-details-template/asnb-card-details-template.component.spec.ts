import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbCardDetailsTemplateComponent } from './asnb-card-details-template.component';

describe('AsnbCardDetailsTemplateComponent', () => {
  let component: AsnbCardDetailsTemplateComponent;
  let fixture: ComponentFixture<AsnbCardDetailsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsnbCardDetailsTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsnbCardDetailsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
