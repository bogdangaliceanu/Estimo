import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
        private router: Router,
        private route: ActivatedRoute
    ) {}

    async onSubmit() {
        const result = await this.userService.logIn(this.user);
        if (result.kind === 'failure') {
            alert(result.data);
        }
        else {
            this.authService.authToken = result.data.authToken;
            await this.goToNextPage();
        }
    }

    async goToNextPage() {
        const nextUrl = this.getNextUrl();
        if (nextUrl) {
            setTimeout(() => this.router.navigateByUrl(nextUrl), 0);
        }
        this.router.navigate(['/home']);
    }

    getNextUrl() {
        let nextUrl: string;        
        this.route.paramMap.subscribe(pm => nextUrl = pm.get('nextUrl')).unsubscribe();
        return nextUrl;
    }
}