import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';
import { UserService } from './user.service';
import { User } from './user';
import { Result } from './result';

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

    async logIn(user: User): Promise<Result<{ authToken: string }, string>> {
        try {
            const response = await this.http.post(environment.backendUrl + 'login', user).toPromise();
            const authToken = response.headers.get('X-Auth-Token');
            
            return { kind: 'success', data: { authToken: authToken } };
        }
        catch (e) {
            if (e.status == 401) {
                return { kind: 'failure', data: 'Username/password combination is invalid' };
            }
            return { kind: 'failure', data: 'An error has occured' };
        }
    }
}