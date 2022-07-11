import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayJobComponent } from './display-job/display-job.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DisplayJobComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
