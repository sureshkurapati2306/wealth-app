import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAsnbDelinkAccountComponent } from './dialog-asnb-delink-account.component';

describe('DialogAsnbDelinkAccountComponent', () => {
  	let component: DialogAsnbDelinkAccountComponent;
  	let fixture: ComponentFixture<DialogAsnbDelinkAccountComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ DialogAsnbDelinkAccountComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogAsnbDelinkAccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
