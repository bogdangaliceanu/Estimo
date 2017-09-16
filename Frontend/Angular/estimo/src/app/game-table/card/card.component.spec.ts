import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';
import { EstimationValue } from '../game';
import { EstimationSymbolPipe } from '../estimation-symbol.pipe';

@Component({
    selector: 'host',
    template: '<card [value]="estimationValue"></card>'
})
class HostComponent {
    estimationValue: EstimationValue;
}

describe('CardComponent', () => {
    let comp: HostComponent;
    let fixture: ComponentFixture<HostComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CardComponent, EstimationSymbolPipe, HostComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('#value'));
        el = de.nativeElement;
    });

    it('should display symbol, 0', () => {
        comp.estimationValue = EstimationValue.Zero;
        fixture.detectChanges();
        expect(el.textContent).toEqual('0');
    });

    it('should display symbol, 1/2', () => {
        comp.estimationValue = EstimationValue.Half;
        fixture.detectChanges();
        expect(el.textContent).toEqual('1/2');
    });

    it('should display symbol, 3', () => {
        comp.estimationValue = EstimationValue.Three;
        fixture.detectChanges();
        expect(el.textContent).toEqual('3');
    });

    it('should display symbol, ?', () => {
        comp.estimationValue = EstimationValue.Unknown;
        fixture.detectChanges();
        expect(el.textContent).toEqual('?');
    });

    it('should display symbol, ∞', () => {
        comp.estimationValue = EstimationValue.Infinity;
        fixture.detectChanges();
        expect(el.textContent).toEqual('∞');
    });
});