import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CardTacComponent, FormatTimePipe } from './card-tac.component';
import { DialogAlertComponent } from '@cimb/mint';

describe('CardTacComponent', () => {
  let component: CardTacComponent;
  let fixture: ComponentFixture<CardTacComponent>;
  let mockDialog: Partial<MatDialog>;

  beforeEach(async () => {
    const mockDialog = {
      open: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [CardTacComponent, FormatTimePipe],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatBottomSheetModule,
        MatButtonToggleModule,
        MatInputModule,
        ReactiveFormsModule,  
      ],
        providers: [{ provide: MatDialog, useValue: mockDialog }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should open the Customer Declaration dialog', () => {
    const openSpy = jest.spyOn(mockDialog, 'open');

    component.customerDeclarationModal();

    expect(openSpy).toHaveBeenCalledWith(DialogAlertComponent, {
      backdropClass: 'no-backdrop',
      panelClass: ['terms-modal', 'modal-v2'],
      maxWidth: '800px',
      autoFocus: false,
      data: {
        dialogHeading: 'Customer Declaration',
        dialogContent: '<div class="content">' + component.customDeclaration + '</div>',
      },
    });
  });

  it('should open the Investor Suitability Assessment Declaration dialog', () => {
    const openSpy = jest.spyOn(mockDialog, 'open');

    component.investorSuitabilityAssessmentDeclarationModal();

    expect(openSpy).toHaveBeenCalledWith(DialogAlertComponent, {
      backdropClass: 'no-backdrop',
      panelClass: ['terms-modal', 'modal-v2'],
      maxWidth: '800px',
      autoFocus: false,
      data: {
        dialogHeading: 'INVESTOR’S SUITABILITY ASSESSMENT DECLARATION',
        dialogContent:
          '<div class="content">' + component.investorSuitabilityAssessmentDeclaration + '</div>',
      },
    });
  });


  
  it('should open the Customer Risk Undertaking Acknowledgment dialog', () => {
    const openSpy = jest.spyOn(mockDialog, 'open');

    component.customerRiskUndertakingacknowledgmentModal();

    expect(openSpy).toHaveBeenCalledWith(DialogAlertComponent, {
      backdropClass: 'no-backdrop',
      panelClass: ['terms-modal', 'modal-v2'],
      maxWidth: '800px',
      autoFocus: false,
      data: {
        dialogHeading: 'Customer Risk Undertaking Acknowledgment',
        dialogContent:
          '<div class="content">' + component.customerRiskUndertakingacknowledgment + '</div>',
      },
    });
  });

  it('should open the CIMB Group Privacy Notice in a new window', () => {
    const windowOpenSpy = jest.spyOn(window, 'open');

    component.cimbGroupPrivacyNoticetModal();

    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://www.cimb.com.my/en/personal/privacy-policy.html',
      '_blank'
    );
  });

});
