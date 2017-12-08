import { EstimationValue } from "../game";

export class OtherPlayer {
    name: string;
    estimate: { value: EstimationValue; isOutstanding?: boolean; }
}