import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDirective } from './common/common.directive';

@NgModule({
    declarations: [CommonDirective],
    imports: [CommonModule],
    exports: [CommonDirective],
})
export class DirectivesModule {}