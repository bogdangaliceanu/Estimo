import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { OtherPlayer } from './other-player/other-player';
import { DialogService, dialogServiceToken } from '../dialog.service';
import { GameService, gameServiceToken } from './game.service';
import { Game, Round, Estimation, EstimationValue } from './game';

@Component({
    selector: 'game-table',
    templateUrl: 'game-table.component.html',
    styleUrls: ['game-table.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class GameTableComponent implements OnInit {
    private gameId: string;
    game: Game;
    selectedRound: Round;
    currentSubject: string;
    currentPlayerEstimation: EstimationValue;
    otherPlayers: OtherPlayer[] = [
        { name: 'Player1', estimate: { cardValue: '3', isOutstanding: true } },
        { name: 'Player2', estimate: { cardValue: '8', isOutstanding: true } },
        { name: 'Player3', estimate: { cardValue: '5', isOutstanding: false } },
        { name: 'Player4', estimate: { cardValue: '?', isOutstanding: true } }
    ];
    readonly cardValues = [
        { text: '0', value: EstimationValue.Zero },
        { text: '1/2', value: EstimationValue.Half },
        { text: '1', value: EstimationValue.One },
        { text: '2', value: EstimationValue.Two },
        { text: '3', value: EstimationValue.Three },
        { text: '5', value: EstimationValue.Five },
        { text: '8', value: EstimationValue.Eight },
        { text: '13', value: EstimationValue.Thirteen },
        { text: '20', value: EstimationValue.Twenty },
        { text: '40', value: EstimationValue.Forty },
        { text: '100', value: EstimationValue.OneHundred },
        { text: '∞', value: EstimationValue.Infinity },
        { text: '?', value: EstimationValue.Unknown }
    ];
    cardBeingDragged: HTMLElement;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        @Inject(dialogServiceToken) private dialogService: DialogService,
        @Inject(gameServiceToken) private gameService: GameService
    ) {}

    async ngOnInit() {
        this.gameId = this.getGameId();
        const result = await this.gameService.get(this.gameId);
        if (result.kind === 'success') {
            this.game = result.data;
        }
        else {
            this.dialogService.alert(result.data);
        }
    }

    getGameId() {
        let gameId: string;
        this.route.paramMap.subscribe(pm => gameId = pm.get('id')).unsubscribe();
        return gameId;
    }

    async onCardSelected(ev: DragEvent, cardSlotArea: HTMLElement) {
        const cardValue = Number(ev.dataTransfer.getData('text')) as EstimationValue;
        this.currentPlayerEstimation = cardValue;

        const result = await this.gameService.estimate(this.gameId, this.currentPlayerEstimation);
        if (result.kind == "success") {
            cardSlotArea.appendChild(this.cardBeingDragged);
        }
        else {
            await this.dialogService.alert(result.data);
        }
        this.cardBeingDragged = null;
    }

    allowDrop(ev: DragEvent) {
        ev.preventDefault();
    }

    onDragStart(ev: DragEvent, cardValue: EstimationValue) {
        ev.dataTransfer.setData("text", cardValue.toString());
        this.cardBeingDragged = ev.target as HTMLElement;
    }

    async newRound() {
        let subject: string;
        do {
            subject = await this.dialogService.prompt('What are you estimating?');
        }
        while(!subject);

        const result = await this.gameService.newRound(this.gameId, subject);
        if (result.kind === "success") {
            this.currentSubject = subject;
        }
        else {
            await this.dialogService.alert(result.data);
        }
    }
}