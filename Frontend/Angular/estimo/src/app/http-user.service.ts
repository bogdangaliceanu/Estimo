import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { UserService } from './user.service';
import { User } from './user';

@Injectable()
export class HttpUserService implements UserService {
    constructor(private http: Http) { }

    async signUp(user: User): Promise<string> {
        try {
            await this.http.post('http://localhost/Estimo.Web/signup', user).toPromise();
        }
        catch (e) {
            if (e.status == 409) {
                return 'This username already belongs to someone else';
            }
            if (e.status == 500) {
                return 'An error has occured';
            }
        }
    }

    logIn(user: User): Promise<string> {
        throw new Error("Method not implemented.");
    }
}