import { InjectionToken } from '@angular/core';

import { User } from './user';
import { Result } from './result';

export interface UserService {
    signUp(user: User): Promise<string>;
    logIn(user: User): Promise<Result<{ authToken: string }, string>>;
}

export const userServiceToken = new InjectionToken<UserService>('UserService');