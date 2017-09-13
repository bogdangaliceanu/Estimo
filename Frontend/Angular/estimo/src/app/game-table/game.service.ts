import { InjectionToken } from '@angular/core';

import { Result } from '../result';
import { Game, EstimationValue } from './game';

export interface GameService {
    newGame(): Promise<Result<{ gameId: string }, string>>;
    newRound(gameId: string, subject: string): Promise<Result<null, string>>;
    estimate(gameId: string, value: EstimationValue): Promise<Result<null, string>>;
    get(gameId: string): Promise<Result<Game, string>>;
}

export const gameServiceToken = new InjectionToken<GameService>('GameService');