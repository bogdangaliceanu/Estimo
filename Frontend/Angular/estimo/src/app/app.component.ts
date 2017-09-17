import { Component, ViewEncapsulation, Inject } from '@angular/core';

import { AuthService, authServiceToken } from './auth.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class AppComponent {
    constructor(@Inject(authServiceToken) public authService: AuthService) {}

    logOut() {
        this.authService.authToken = null;
    }
}
