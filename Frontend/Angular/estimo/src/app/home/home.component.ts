import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, authServiceToken } from '../auth.service';
import { GameService, gameServiceToken } from '../game-table/game.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class HomeComponent {
    constructor(
        @Inject(authServiceToken) private authService: AuthService,
        @Inject(gameServiceToken) private gameService: GameService,
        private router: Router
    ) {}

    async newGame() {
        const result = await this.gameService.newGame();
        if (result.kind == 'success') {
            this.router.navigate(['/game', result.data.gameId]);
        }
        else {
            alert(result.data);
        }
    }
}