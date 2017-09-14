import { InjectionToken } from '@angular/core';

export interface AuthService {
    authToken: string;
    username: string;
}

export const authServiceToken = new InjectionToken<AuthService>('AuthService');