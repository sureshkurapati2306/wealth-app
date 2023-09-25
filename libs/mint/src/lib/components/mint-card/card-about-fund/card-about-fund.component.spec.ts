import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAboutFundComponent } from './card-about-fund.component';

describe('CardAboutFundComponent', () => {
  let component: CardAboutFundComponent;
  let fixture: ComponentFixture<CardAboutFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardAboutFundComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAboutFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should openNAVactionSheet', () => {
    fixture.detectChanges();

    expect(component.openNAVactionSheet()).toBeUndefined();
  });
});
