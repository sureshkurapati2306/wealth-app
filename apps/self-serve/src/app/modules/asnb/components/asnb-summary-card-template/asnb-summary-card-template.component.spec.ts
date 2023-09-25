import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbSummaryCardTemplateComponent } from './asnb-summary-card-template.component';

describe('AsnbSummaryCardTemplateComponent', () => {
  let component: AsnbSummaryCardTemplateComponent;
  let fixture: ComponentFixture<AsnbSummaryCardTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsnbSummaryCardTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsnbSummaryCardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
