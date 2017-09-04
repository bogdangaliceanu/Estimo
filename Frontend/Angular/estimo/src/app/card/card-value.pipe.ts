import { Pipe, PipeTransform } from '@angular/core';

import { CardValue } from './card-value';

@Pipe({
    name: 'cardvalue',
    pure: true
})
export class CardValuePipe implements PipeTransform {
    transform(value: CardValue, ...args: any[]) {
        switch (value) {
            case CardValue.zero: return '0';
            case CardValue.half: return '1/2';
            case CardValue.one: return '1';
            case CardValue.two: return '2';
            case CardValue.three: return '3';
            case CardValue.five: return '5';
            case CardValue.eight: return '8';
            case CardValue.thirteen: return '13';
            case CardValue.twenty: return '20';
            case CardValue.forty: return '40';
            case CardValue.oneHundred: return '100';
            case CardValue.infinity: return '∞';
            case CardValue.unknown: return '?';
            default: throw new Error(`Unknown card value ${value}`);
        }
    }
}