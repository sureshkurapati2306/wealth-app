import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtSubheaderComponent } from './ut-subheader.component';

describe('UtSubheaderComponent', () => {
  let component: UtSubheaderComponent;
  let fixture: ComponentFixture<UtSubheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtSubheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtSubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onWealthDashbaordClick()', () => {
    expect(component.onWealthDashbaordClick()).toBeUndefined();
  });
});
