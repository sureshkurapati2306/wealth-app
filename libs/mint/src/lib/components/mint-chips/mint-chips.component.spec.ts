import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintChipsComponent } from './mint-chips.component';

describe('MintChipsComponent', () => {
  let component: MintChipsComponent;
  let fixture: ComponentFixture<MintChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MintChipsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
