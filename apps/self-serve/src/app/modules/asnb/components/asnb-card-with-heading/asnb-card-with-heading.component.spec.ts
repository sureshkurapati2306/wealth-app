import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbCardWithHeadingComponent } from './asnb-card-with-heading.component';

describe('AsnbCardWithHeadingComponent', () => {
  let component: AsnbCardWithHeadingComponent;
  let fixture: ComponentFixture<AsnbCardWithHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsnbCardWithHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsnbCardWithHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
