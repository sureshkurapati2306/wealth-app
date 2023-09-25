import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPopupComponent } from './dialog-popup.component';

describe('DialogPopupComponent', () => {
  let component: DialogPopupComponent;
  let fixture: ComponentFixture<DialogPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogPopupComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn()
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            content: 'Test Content',
            imageSrc: 'test-image.png'
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize component with data', () => {
    expect(component).toBeTruthy();
    expect(component.titleComments).toBe('Test Title');
    expect(component.subtitleComments).toBe('Test Subtitle');
    expect(component.contentComments).toBe('Test Content');
    expect(component.imageSrc).toBe('test-image.png');
  });
});
