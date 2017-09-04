import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { SuiteComponent } from './suite/suite.component';
import { CardValuePipe } from './card/card-value.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardValuePipe,
    SuiteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
