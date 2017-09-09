import { InjectionToken } from '@angular/core';

import { Result } from '../result';

export interface GameService {
    newGame(): Promise<Result<{ gameId: string }, string>>;
    newRound(gameId: string, subject: string): Promise<Result<null, string>>;
}

export const gameServiceToken = new InjectionToken<GameService>('GameService');