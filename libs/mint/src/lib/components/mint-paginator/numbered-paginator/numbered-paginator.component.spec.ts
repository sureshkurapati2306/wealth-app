import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { NumberedPaginatorComponent } from './numbered-paginator.component';

class htmlMock {
  scrollTo() { /* mock */ }
};

describe('NumberedPaginatorComponent', () => {
  let component: NumberedPaginatorComponent;
  let fixture: ComponentFixture<NumberedPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberedPaginatorComponent ],
      imports: [
        NgxPaginationModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberedPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onPageChange and scroll to Header', fakeAsync(() => {

    jest.spyOn(document, 'querySelector').mockReturnValue(new htmlMock() as Element);

    expect(component.onPageChange(1)).toBeUndefined();

    document.body.innerHTML = `
      <div>
        <div id="Header">Dummy</div>
      </div>`;

    tick(50);
    fixture.detectChanges();
  
  }));

});
