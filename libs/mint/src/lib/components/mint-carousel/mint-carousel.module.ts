import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { CarouselWealthBannersComponent } from './carousel-wealth-banners/carousel-wealth-banners.component';


@NgModule({
  declarations: [
    CarouselWealthBannersComponent
  ],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports: [
    CarouselWealthBannersComponent
  ]
})
export class MintCarouselModule { }
