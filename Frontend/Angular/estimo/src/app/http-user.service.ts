import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';
import { UserService, LoginResult } from './user.service';
import { User } from './user';

@Injectable()
export class HttpUserService implements UserService {
    constructor(private http: Http) { }

    async signUp(user: User): Promise<string> {
        try {
            await this.http.post(environment.backendUrl + 'signup', user).toPromise();
        }
        catch (e) {
            if (e.status == 409) {
                return 'This username already belongs to someone else';
            }
            return 'An error has occured';
        }
    }

    async logIn(user: User): Promise<LoginResult> {
        try {
            const response = await this.http.post(environment.backendUrl + 'login', user).toPromise();
            const authToken = response.headers.get('X-Auth-Token');
            if (!authToken) {
                return { kind: 'failure', message: 'Did not receive an auth token' };
            }
            return { kind: 'success', authToken: authToken };
        }
        catch (e) {
            if (e.status == 401) {
                return { kind: 'failure', message: 'Username/password combination is invalid' };
            }
            return { kind: 'failure', message: 'An error has occured' };
        }
    }
}