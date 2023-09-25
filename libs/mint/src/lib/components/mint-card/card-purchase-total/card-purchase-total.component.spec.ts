import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPurchaseTotalComponent } from './card-purchase-total.component';

import {MatSliderModule} from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';

describe('CardPurchaseTotalComponent', () => {
  let component: CardPurchaseTotalComponent;
  let fixture: ComponentFixture<CardPurchaseTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPurchaseTotalComponent],
      imports: [MatSliderModule, MatInputModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPurchaseTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
