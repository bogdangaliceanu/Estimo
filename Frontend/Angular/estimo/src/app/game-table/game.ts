export enum EstimationValue {
    Zero,
    Half,
    One,
    Two,
    Three,
    Five,
    Eight,
    Thirteen,
    Twenty,
    Forty,
    OneHundred,
    Infinity,
    Unknown
}

export class Game {
    id: string;
    initiator: string;
    rounds: Round[];
}

export class Round {
    subject: string;
    consensus: EstimationValue | null;
    estimations: Estimation[];
}

export class Estimation {
    player: string;
    value: EstimationValue | null;
}
