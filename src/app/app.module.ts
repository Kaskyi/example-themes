import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ExampleComponent} from './example/example.component';
import { ExampleV2Component } from './example-v2/example-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    ExampleV2Component,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
