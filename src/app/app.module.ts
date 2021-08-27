import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TriageFormComponent } from './triage-form/triage-form.component';
import { JourneyComponent } from './journey/journey.component';

@NgModule({
  imports: [AppRoutingModule, BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HomeComponent,
    TriageFormComponent,
    JourneyComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
