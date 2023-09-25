import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxRiskProfileComponent } from './box-risk-profile.component';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
class dialogMock {
  open() {
      return {
          afterClosed: () => of({}),
      };
  }
}
describe('BoxRiskProfileComponent', () => {
  let component: BoxRiskProfileComponent;
  let fixture: ComponentFixture<BoxRiskProfileComponent>;
  let dialog: any;
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxRiskProfileComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDialogModule, StoreModule.forRoot({}), RouterTestingModule],
      providers: [
        { provide: MatDialog, useClass: dialogMock },
        provideMockStore({
            initialState: {
                questions: null,
            },
        }),
    ],
      
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxRiskProfileComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onRedoRiskProfilingClick()', () => {
    expect(component.onRedoRiskProfilingClick()).toBeTruthy
  });
  

  it('should call applyNoCASASopePropAM()', () => {
    expect(component.applyNoCASASopePropAML('heading', 'content', 'buttonProceedText') ).toBeTruthy
  });
});
