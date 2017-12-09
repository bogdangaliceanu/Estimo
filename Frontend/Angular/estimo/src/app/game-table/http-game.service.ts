import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';
import { GameService } from './game.service';
import { AuthService, authServiceToken } from '../auth.service';
import { Result } from '../result';
import { Game, EstimationValue } from './game';

@Injectable()
export class HttpGameService implements GameService {
    constructor(
        private http: Http,
        @Inject(authServiceToken) private authService: AuthService
    ) {}

    async newGame(): Promise<Result<{ gameId: string }, string>> {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.authService.authToken}`);
            const response = await this.http.post(environment.backendUrl + 'games', null, { headers: headers }).toPromise();
            const gameId = response.headers.get('Location');

            return { kind: 'success', data: { gameId: gameId } };
        }
        catch (e) {
            if (e.status == 401) {
                return { kind: 'failure', data: 'Access denied' };
            }
            return { kind: 'failure', data: 'An error has occured' };
        }
    }

    async newRound(gameId: string, subject: string): Promise<Result<null, string>> {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.authService.authToken}`);

            const url = `${environment.backendUrl}games/${gameId}/round`;
            const response = await this.http.post(url, { subject: subject }, { headers: headers })
                .toPromise();

            return { kind: 'success', data: null };
        }
        catch (e) {
            if (e.status == 401) {
                return { kind: 'failure', data: 'Access denied' };
            }
            if (e.status == 403) {
                return { kind: 'failure', data: e.text() };
            }
            return { kind: 'failure', data: 'An error has occured' };
        }
    }

    async finishRound(gameId: string, consensus: EstimationValue): Promise<Result<null, string>> {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.authService.authToken}`);

            const url = `${environment.backendUrl}games/${gameId}/round`;
            const response = await this.http.put(url, { consensus: consensus }, { headers: headers })
                .toPromise();

            return { kind: 'success', data: null };
        }
        catch (e) {
            if (e.status == 401) {
                return { kind: 'failure', data: 'Access denied' };
            }
            if (e.status == 403) {
                return { kind: 'failure', data: e.text() };
            }
            return { kind: 'failure', data: 'An error has occured' };
        }
    }

    async estimate(gameId: string, value: EstimationValue): Promise<Result<null, string>> {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.authService.authToken}`);

            const url = `${environment.backendUrl}games/${gameId}/estimation`;
            const response = await this.http.post(url, { value: value }, { headers: headers })
                .toPromise();

            return { kind: 'success', data: null };
        }
        catch (e) {
            if (e.status == 401) {
                return { kind: 'failure', data: 'Access denied' };
            }
            if (e.status == 403) {
                return { kind: 'failure', data: e.text() };
            }
            return { kind: 'failure', data: 'An error has occured' };
        }
    }

    async get(gameId: string): Promise<Result<Game, string>> {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.authService.authToken}`);

            const url = `${environment.backendUrl}games/${gameId}`;
            const response = await this.http.get(url, { headers: headers })
                .toPromise();

            return { kind: 'success', data: response.json() };
        }
        catch (e) {
            if (e.status == 401) {
                return { kind: 'failure', data: 'Access denied' };
            }
            return { kind: 'failure', data: 'An error has occured' };
        }
    }

    async getIds(): Promise<Result<string[], string>> {
        try {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.authService.authToken}`);

            const url = `${environment.backendUrl}games/ids`;
            const response = await this.http.get(url, { headers: headers })
                .toPromise();

            return { kind: 'success', data: response.json() };
        }
        catch (e) {
            if (e.status == 401) {
                return { kind: 'failure', data: 'Access denied' };
            }
            return { kind: 'failure', data: 'An error has occured' };
        }
    }
}