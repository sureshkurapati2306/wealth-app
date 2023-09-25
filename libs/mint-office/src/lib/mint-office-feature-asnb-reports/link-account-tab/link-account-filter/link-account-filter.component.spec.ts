import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkAccountFilterComponent } from './link-account-filter.component';

describe('LinkAccountFilterComponent', () => {
  let component: LinkAccountFilterComponent;
  let fixture: ComponentFixture<LinkAccountFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkAccountFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkAccountFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
