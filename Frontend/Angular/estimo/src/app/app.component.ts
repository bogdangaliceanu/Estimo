import { Component, ViewEncapsulation } from '@angular/core';

import { CardValue } from './card/card-value';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class AppComponent {
    cardValue = CardValue.infinity;
}
