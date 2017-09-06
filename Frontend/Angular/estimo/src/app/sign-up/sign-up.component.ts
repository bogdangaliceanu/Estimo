import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, userServiceToken } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class SignUpComponent {
    readonly user = new User('', '');

    constructor(
        @Inject(userServiceToken) private userService: UserService,
        private router: Router
    ) {}

    async onSubmit() {
        const error = await this.userService.signUp(this.user);
        if (error) {
            alert(error);
        }
        else {
            this.router.navigate(['/login']);
        }
    }
}