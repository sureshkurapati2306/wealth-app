import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SwiperModule } from 'swiper/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CarouselWealthBannersComponent } from './carousel-wealth-banners.component';
import { provideMockStore } from '@ngrx/store/testing';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';

describe('CarouselBasicComponent', () => {
    let component: CarouselWealthBannersComponent;
    let fixture: ComponentFixture<CarouselWealthBannersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CarouselWealthBannersComponent],
            imports: [SwiperModule, RouterTestingModule, MatDialogModule],
            providers: [provideMockStore({ initialState: {} })],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CarouselWealthBannersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', fakeAsync(() => {
        const timerSubscription = component.interval$.subscribe(() => {
            /** */
        });

        tick(10000);

        timerSubscription.unsubscribe();

        expect(component).toBeTruthy();
    }));

    it('should ngOnChanges', () => {
        component.ngOnChanges();

        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should ngOnDestroy', () => {
        expect(component.ngOnDestroy).toBeTruthy();
    });
});
