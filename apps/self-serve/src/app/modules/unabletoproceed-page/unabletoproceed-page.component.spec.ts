import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnabletoproceedPageComponent } from './unabletoproceed-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('UnabletoproceedPageComponent', () => {
  let component: UnabletoproceedPageComponent;
  let fixture: ComponentFixture<UnabletoproceedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot({}),
            RouterTestingModule.withRoutes([]),
          ],
      declarations: [UnabletoproceedPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnabletoproceedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});