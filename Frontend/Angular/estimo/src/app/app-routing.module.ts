import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { GameTableComponent } from './game-table/game-table.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'login/:nextUrl', component: LogInComponent },
    { path: 'login', component: LogInComponent },
    { path: 'game/:id', component: GameTableComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}