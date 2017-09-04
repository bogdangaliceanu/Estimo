import { Component, ViewEncapsulation, Input } from '@angular/core';

import { CardValue } from './card-value';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: [ './card.component.css' ],
    encapsulation: ViewEncapsulation.Native
})
export class CardComponent {
    public isSelected = false;

    @Input() public value: CardValue;
}