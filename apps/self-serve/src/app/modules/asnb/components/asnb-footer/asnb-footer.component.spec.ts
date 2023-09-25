import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnbFooterComponent } from './asnb-footer.component';

describe('AsnbFooterComponent', () => {
  let component: AsnbFooterComponent;
  let fixture: ComponentFixture<AsnbFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsnbFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsnbFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
