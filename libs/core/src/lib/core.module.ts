import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowInputPrefixDirective } from './directives/show-input-prefix.directive';
import { HighlightTextPipe } from './pipes/highlight-text/highlight-text.pipe';
import { TooltipsListPipe } from './pipes/tooltips-list/tooltips-list.pipe';
import { LoanAccNumPipe } from './pipes/loanAccNum/loan-acc-num.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ShowInputPrefixDirective, HighlightTextPipe, TooltipsListPipe, LoanAccNumPipe],
    exports: [ShowInputPrefixDirective, HighlightTextPipe, TooltipsListPipe, LoanAccNumPipe],
})
export class CoreModule {}
