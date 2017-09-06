import { InjectionToken } from '@angular/core';

import { User } from './user';

interface Failure {
    kind: 'failure';
    message: string;
}

interface Success {
    kind: 'success';
    authToken: string;
}

export type LoginResult = Failure | Success;

export interface UserService {
    signUp(user: User): Promise<string>;
    logIn(user: User): Promise<LoginResult>;
}

export const userServiceToken = new InjectionToken<UserService>('UserService');