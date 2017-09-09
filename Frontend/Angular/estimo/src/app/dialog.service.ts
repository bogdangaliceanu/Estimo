import { InjectionToken } from '@angular/core';

export interface DialogService {
    alert(message: string): Promise<void>;
    confirm(message: string): Promise<boolean>;
    prompt(message: string): Promise<string>;
}

export const dialogServiceToken = new InjectionToken<DialogService>('DialogService');