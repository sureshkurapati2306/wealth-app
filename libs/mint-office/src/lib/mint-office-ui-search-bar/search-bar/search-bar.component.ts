import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'cimb-office-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
    @Input() placeholder: string;
    @Input() showSearchButton = true;
    @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    searchValue = '';

    onSearchKeyup(event: string) {
        this.inputChange.emit(event);
    }

    onSearchClick() {
        this.search.emit(this.searchValue);
    }
}
