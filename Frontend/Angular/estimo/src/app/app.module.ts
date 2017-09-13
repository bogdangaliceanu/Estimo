import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CardComponent } from './game-table/card/card.component';
import { CardSlotComponent } from './game-table/card-slot/card-slot.component';
import { OtherPlayerComponent } from './game-table/other-player/other-player.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { GameTableComponent } from './game-table/game-table.component';
import { AppRoutingModule } from './app-routing.module';
import { userServiceToken } from './user.service';
import { HttpUserService } from './http-user.service';
import { authServiceToken } from './auth.service';
import { SessionStorageAuthService } from './session-storage-auth.service';
import { gameServiceToken } from './game-table/game.service';
import { HttpGameService } from './game-table/http-game.service';
import { dialogServiceToken } from './dialog.service';
import { BrowserDialogService } from './browser-dialog.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
    declarations: [
        AppComponent,
        CardComponent,
        OtherPlayerComponent,
        HomeComponent,
        SignUpComponent,
        LogInComponent,
        GameTableComponent,
        CardSlotComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        { provide: userServiceToken, useClass: HttpUserService },
        { provide: authServiceToken, useClass: SessionStorageAuthService },
        { provide: gameServiceToken, useClass: HttpGameService },
        { provide: dialogServiceToken, useClass: BrowserDialogService },
        AuthGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
