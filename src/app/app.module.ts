import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APIService } from './api.service';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './material.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularMaterialModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [APIService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('App is Initialized!!');
  }
}
