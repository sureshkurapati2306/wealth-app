import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAsnbRedirectionComponent } from './dialog-asnb-redirection.component';

describe('DialogAsnbRedirectionComponent', () => {
  	let component: DialogAsnbRedirectionComponent;
  	let fixture: ComponentFixture<DialogAsnbRedirectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ DialogAsnbRedirectionComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogAsnbRedirectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
