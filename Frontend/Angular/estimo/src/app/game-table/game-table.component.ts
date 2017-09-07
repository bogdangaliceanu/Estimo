import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { OtherPlayer } from '../other-player/other-player';
import { AuthService, authServiceToken } from '../auth.service';

@Component({
    selector: 'game-table',
    templateUrl: 'game-table.component.html',
    styleUrls: ['game-table.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class GameTableComponent implements OnInit {
    private gameId: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        @Inject(authServiceToken) private authService: AuthService
    ) {}

    async ngOnInit() {
        this.gameId = await this.getGameId();
    }

    getGameId() {
        return this.route.paramMap
            .switchMap((params: ParamMap) => {
                return params.get('id');
            })
            .toPromise();
    }

    otherPlayers: OtherPlayer[] = [
        { name: 'Player1', estimate: { cardValue: '3', isOutstanding: true } },
        { name: 'Player2', estimate: { cardValue: '8', isOutstanding: true } },
        { name: 'Player3', estimate: { cardValue: '5', isOutstanding: false } },
        { name: 'Player4', estimate: { cardValue: '?', isOutstanding: true } }
    ];

    onCardSelected(cardValue: string) {
    }
}