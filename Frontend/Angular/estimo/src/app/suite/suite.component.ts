import { Component, ViewEncapsulation } from '@angular/core';

import { CardValue } from '../card/card-value';

@Component({
    selector: 'suite',
    templateUrl: './suite.component.html',
    styleUrls: [ './suite.component.css' ],
    encapsulation: ViewEncapsulation.Native
})
export class SuiteComponent {
    cardValue = CardValue.forty;
}