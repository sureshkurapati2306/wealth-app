import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBoCtaComponent } from './footer-bo-cta.component';

describe('FooterBoCtaComponent', () => {
  let component: FooterBoCtaComponent;
  let fixture: ComponentFixture<FooterBoCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterBoCtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBoCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onClick', () => {
    expect(component.onClick()).toBeUndefined();
  });
});
