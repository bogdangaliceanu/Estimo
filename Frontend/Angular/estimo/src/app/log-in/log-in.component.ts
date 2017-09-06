import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, authServiceToken } from '../auth.service';
import { UserService, userServiceToken } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class LogInComponent {
    readonly user = new User('', '');

    constructor(
        @Inject(userServiceToken) private userService: UserService,
        @Inject(authServiceToken) private authService: AuthService,
        private router: Router
    ) {}

    async onSubmit() {
        const result = await this.userService.logIn(this.user);
        if (result.kind === 'failure') {
            alert(result.message);
        }
        else {
            this.authService.authToken = result.authToken;
            this.router.navigate(['/home']);
        }
    }
}