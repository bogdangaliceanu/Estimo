import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService, dialogServiceToken } from '../dialog.service';
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
        @Inject(dialogServiceToken) private dialogService: DialogService,
        @Inject(userServiceToken) private userService: UserService,
        private router: Router
    ) {}

    async onSubmit() {
        const error = await this.userService.signUp(this.user);
        if (error) {
            await this.dialogService.alert(error);
        }
        else {
            this.router.navigate(['/login']);
        }
    }
}