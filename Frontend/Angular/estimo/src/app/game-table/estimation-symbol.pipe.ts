import { Pipe, PipeTransform } from '@angular/core';

import { EstimationValue } from './game';

@Pipe({
    name: 'estimationSymbol'
})
export class EstimationSymbolPipe implements PipeTransform {
    private static readonly valueToSymbol = new Map<EstimationValue, string>([
        [EstimationValue.Zero, '0'],
        [EstimationValue.Half, '1/2'],
        [EstimationValue.One, '1'],
        [EstimationValue.Two, '2'],
        [EstimationValue.Three, '3'],
        [EstimationValue.Five, '5'],
        [EstimationValue.Eight, '8'],
        [EstimationValue.Thirteen, '13'],
        [EstimationValue.Twenty, '20'],
        [EstimationValue.Forty, '40'],
        [EstimationValue.OneHundred, '100'],
        [EstimationValue.Infinity, '∞'],
        [EstimationValue.Unknown, '?']
    ]);

    transform(value: EstimationValue, ...args: any[]) {
        return EstimationSymbolPipe.valueToSymbol.get(value);
    }
}