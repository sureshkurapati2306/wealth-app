import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintSingleSelectComponent } from './mint-single-select.component';

describe('MintSingleSelectComponent', () => {
  let component: MintSingleSelectComponent;
  let fixture: ComponentFixture<MintSingleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintSingleSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintSingleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
