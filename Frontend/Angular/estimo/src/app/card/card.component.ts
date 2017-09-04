import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class CardComponent {
    @Input() isSelected: boolean;
    @Input() isOutstanding: boolean;
    @Input() value: string;
}