import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { MatMenuModule } from '@angular/material/menu';
import { StoreModule } from '@ngrx/store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatMenuModule,
        StoreModule.forRoot({}),
        MatDialogModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [MatDialog],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should doSomething()', () => {
    const ev = new Event('click');
    expect(component.doSomething(ev)).toBeUndefined();
  });

  it('should unsubscribe all observables and complete the subject', () => {
    // Arrange
    const nextSpy = jest.spyOn(component['_unsubscribeAll'], 'next');
    const completeSpy = jest.spyOn(component['_unsubscribeAll'], 'complete');
  
    // Act
    component.ngOnDestroy();
  
    // Assert
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
