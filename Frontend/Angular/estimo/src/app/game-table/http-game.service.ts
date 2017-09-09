import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';
import { GameService } from './game.service';
import { AuthService, authServiceToken } from '../auth.service';
import { Result } from '../result';

@Injectable()
export class HttpGameService implements GameService {
    constructor(
        private http: Http,
        @Inject(authServiceToken) private authService: AuthService
    ) {}

    async newGame(): Promise<Result<{ gameId: string }, string>> {
        try {
            const headers = new Headers();
            headers.append('X-Auth-Token', this.authService.authToken);
            const response = await this.http.post(environment.backendUrl + 'game', null, { headers: headers }).toPromise();
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
}