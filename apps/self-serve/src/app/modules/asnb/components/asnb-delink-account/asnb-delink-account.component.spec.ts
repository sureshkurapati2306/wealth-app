import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { AsnbDelinkAccountComponent } from './asnb-delink-account.component';

describe('AsnbDelinkAccountComponent', () => {
  	let component: AsnbDelinkAccountComponent;
  	let fixture: ComponentFixture<AsnbDelinkAccountComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ AsnbDelinkAccountComponent ],
            providers: [
                {
                    provide: MatDialog,
                    useValue: {},
                },
            ],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AsnbDelinkAccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
