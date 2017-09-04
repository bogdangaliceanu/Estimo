import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class AppComponent {
    onCardSelected(cardValue: string) {
        console.log(cardValue);
    }        
}
