import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemdowntimePageComponent } from './systemdowntime-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('SystemdowntimePageComponent', () => {
  let component: SystemdowntimePageComponent;
  let fixture: ComponentFixture<SystemdowntimePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot({}),
            RouterTestingModule.withRoutes([]),
          ],
      declarations: [SystemdowntimePageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemdowntimePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});