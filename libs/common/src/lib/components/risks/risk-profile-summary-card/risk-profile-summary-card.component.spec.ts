import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskProfileSummaryCardComponent } from './risk-profile-summary-card.component';
import { provideMockStore } from '@ngrx/store/testing';
import { getRiskProfileResults } from 'apps/self-serve/src/app/modules/risk-profile/+state/risk-profile.selectors';
import { mockSubmitAnswerResponse } from 'apps/self-serve/src/app/modules/risk-profile/mock/data';

describe('RiskProfileSummaryCardComponent', () => {
  let component: RiskProfileSummaryCardComponent;
  let fixture: ComponentFixture<RiskProfileSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskProfileSummaryCardComponent ],
      providers:[
          provideMockStore({
          initialState: {
              questions: null,
          },
          selectors: [
              { selector: getRiskProfileResults, value: mockSubmitAnswerResponse },
          ],
        }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskProfileSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
