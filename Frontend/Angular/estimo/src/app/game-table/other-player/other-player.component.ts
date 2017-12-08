import { Component, ViewEncapsulation, Input } from '@angular/core';

import { OtherPlayer } from './other-player';

@Component({
    selector: 'other-player',
    templateUrl: './other-player.component.html',
    styleUrls: ['./other-player.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class OtherPlayerComponent {
    @Input() otherPlayer: OtherPlayer;
    @Input() showEstimation: boolean;
}