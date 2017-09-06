import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { SuiteComponent } from './suite/suite.component';
import { OtherPlayerComponent } from './other-player/other-player.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { AppRoutingModule } from './app-routing.module';
import { userServiceToken } from './user.service';
import { HttpUserService } from './http-user.service';
import { authServiceToken } from './auth.service';
import { SessionStorageAuthService } from './session-storage-auth.service';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SuiteComponent,
    OtherPlayerComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: userServiceToken, useClass: HttpUserService },
    { provide: authServiceToken, useClass: SessionStorageAuthService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
