import { InjectionToken } from '@angular/core';

import { Result } from '../result';
import { EstimationValue } from './estimation-value';

export interface GameService {
    newGame(): Promise<Result<{ gameId: string }, string>>;
    newRound(gameId: string, subject: string): Promise<Result<null, string>>;
    estimate(gameId: string, value: EstimationValue): Promise<Result<null, string>>;
}

export const gameServiceToken = new InjectionToken<GameService>('GameService');