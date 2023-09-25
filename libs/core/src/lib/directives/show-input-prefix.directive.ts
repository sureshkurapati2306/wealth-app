import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[cimbShowInputPrefix]',
})
export class ShowInputPrefixDirective {
    constructor(private el: ElementRef) {}

    @HostListener('focus', ['$event']) onFocus() {
        this.showPrefix('block');
    }

    @HostListener('blur', ['$event']) onBlur() {
        this.showPrefix('none');
    }

    private showPrefix(value: any) {
        const input = this.el.nativeElement;
        const element = input.parentElement.parentElement.querySelector('[matprefix]');

        if (input.value.length === 0) {
            element.style.display = value;
        }
    }
}
