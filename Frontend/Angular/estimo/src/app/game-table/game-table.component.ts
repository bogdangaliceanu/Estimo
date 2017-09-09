import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { OtherPlayer } from './other-player/other-player';
import { DialogService, dialogServiceToken } from '../dialog.service';
import { GameService, gameServiceToken } from './game.service';
import { EstimationValue } from './estimation-value';

@Component({
    selector: 'game-table',
    templateUrl: 'game-table.component.html',
    styleUrls: ['game-table.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class GameTableComponent implements OnInit {
    private gameId: string;
    currentSubject: string;
    currentPlayerEstimation: EstimationValue;
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

    ngOnInit() {
        this.route.paramMap.subscribe(pm => this.gameId = pm.get('id')).unsubscribe();
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