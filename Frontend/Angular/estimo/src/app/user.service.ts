import { InjectionToken } from '@angular/core';

import { User } from './user';

export interface UserService {
    signUp(user: User): Promise<string>;
    logIn(user: User): Promise<string>;
}

export const userServiceToken = new InjectionToken<UserService>('UserService');