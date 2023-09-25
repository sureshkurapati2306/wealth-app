import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterCartComponent } from './footer-cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

describe('FooterCartComponent', () => {
  let component: FooterCartComponent;
  let fixture: ComponentFixture<FooterCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
    ],
      declarations: [FooterCartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should viewMyCartClick', () => {
    expect(component.viewMyCartClick()).toBeUndefined();
  });
});
