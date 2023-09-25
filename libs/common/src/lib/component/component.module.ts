import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { FooterCartComponent } from './footer-cart/footer-cart.component';
import { ProgressSubHeaderComponent } from './progress-sub-header/progress-sub-header.component';
import { MintIconModule, MintStepsModule } from '@cimb/mint';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FooterBoCtaComponent } from './footer-bo-cta/footer-bo-cta.component';
import { UtSubheaderComponent } from './ut-subheader/ut-subheader.component';
import { MatSpinnerOverlayComponent } from './mat-spinner-overlay/mat-spinner-overlay.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubheaderComponent,
    FooterCartComponent,
    ProgressSubHeaderComponent,
    FooterBoCtaComponent,
    UtSubheaderComponent,
    MatSpinnerOverlayComponent
  ],
  imports: [CommonModule, MatMenuModule, MatButtonModule, MintStepsModule, MatTooltipModule, MintIconModule, MatProgressSpinnerModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SubheaderComponent,
    FooterCartComponent,
    ProgressSubHeaderComponent,
    FooterBoCtaComponent,
    UtSubheaderComponent,
    MatSpinnerOverlayComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentModule { }
