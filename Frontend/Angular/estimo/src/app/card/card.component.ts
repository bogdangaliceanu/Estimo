import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class CardComponent {
    @Input() public isSelected;

    @Input() public value: string;
}