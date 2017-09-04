import { Component, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'suite',
    templateUrl: './suite.component.html',
    styleUrls: ['./suite.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class SuiteComponent {
    readonly cardValues = ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '∞', '?'];
    selectedCardValue: string;
    @Output() readonly cardSelected = new EventEmitter<string>();

    onCardSelected(cardValue: string) {
        if (!this.selectedCardValue) {
            this.selectedCardValue = cardValue;
            this.cardSelected.emit(cardValue);
        }
    }
}