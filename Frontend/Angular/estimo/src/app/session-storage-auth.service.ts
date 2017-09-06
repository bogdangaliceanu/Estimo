import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class SessionStorageAuthService implements AuthService {
    get authToken() {
        return sessionStorage.getItem('authToken');
    }

    set authToken(value: string) {
        sessionStorage.setItem('authToken', value);
    }
}