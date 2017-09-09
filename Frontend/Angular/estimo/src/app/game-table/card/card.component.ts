import { Component, ViewEncapsulation, Input } from '@angular/core';

import { EstimationValue } from '../estimation-value';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class CardComponent {
    @Input() value: EstimationValue;
    @Input() text: string;
}