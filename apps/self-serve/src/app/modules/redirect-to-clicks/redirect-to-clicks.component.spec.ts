import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedirectToClicksComponent } from './redirect-to-clicks.component';
import { StoreModule } from '@ngrx/store';


describe('RedirectToClicksComponent', () => {
  let component: RedirectToClicksComponent;
  let fixture: ComponentFixture<RedirectToClicksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [RedirectToClicksComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectToClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('RedrecrToClicksComponent logoutEvent -  clicked', () => {
    const users = {customer_id:'111',customer_id_type:'111',user:"aaaaa"};
    component.userDatas = users;
    expect(component.logoutEvent()).toBeUndefined();
  });

});
