import { Injectable } from '@angular/core';

import { DialogService, dialogServiceToken } from './dialog.service';

@Injectable()
export class BrowserDialogService implements DialogService {
    alert(message: string): Promise<void> {
        alert(message);
        return;
    }
    confirm(message: string): Promise<boolean> {
        const result = confirm(message);
        return Promise.resolve(result);
    }
    prompt(message: string): Promise<string> {
        const result = prompt(message);
        return Promise.resolve(result);
    }
}