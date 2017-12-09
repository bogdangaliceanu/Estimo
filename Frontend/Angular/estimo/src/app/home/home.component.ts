import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService, dialogServiceToken } from '../dialog.service';
import { AuthService, authServiceToken } from '../auth.service';
import { GameService, gameServiceToken } from '../game-table/game.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class HomeComponent implements OnInit {
    gameIds: string[];

    constructor(
        @Inject(dialogServiceToken) private dialogService: DialogService,
        @Inject(authServiceToken) public authService: AuthService,
        @Inject(gameServiceToken) private gameService: GameService,
        private router: Router
    ) { }

    async ngOnInit() {
        if (this.authService.authToken) {
            const result = await this.gameService.getIds();
            if (result.kind === 'success') {
                this.gameIds = result.data;
            }
            else {
                this.dialogService.alert(result.data);
            }
        }
    }

    async newGame() {
        const result = await this.gameService.newGame();
        if (result.kind == 'success') {
            this.router.navigate(['/game', result.data.gameId]);
        }
        else {
            this.dialogService.alert(result.data);
        }
    }
}