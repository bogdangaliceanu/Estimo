import { Component, ViewEncapsulation } from '@angular/core';

import { OtherPlayer } from './other-player/other-player';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class AppComponent {
    otherPlayers: OtherPlayer[] = [
        { name: 'Player1', cardValue: '3' },
        { name: 'Player2', cardValue: '5' },
        { name: 'Player3', cardValue: '?' },
    ];

    onCardSelected(cardValue: string) {
        console.log(cardValue);
    }        
}
