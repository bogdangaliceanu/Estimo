import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { SuiteComponent } from './suite/suite.component';
import { OtherPlayerComponent } from './other-player/other-player.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SuiteComponent,
    OtherPlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
