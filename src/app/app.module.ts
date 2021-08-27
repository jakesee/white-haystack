import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TriageFormComponent } from './triage-form/triage-form.component';
import { JourneyComponent } from './journey/journey.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CollectPersonalInfoFormComponent } from './collect-personal-info-form/collect-personal-info-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    JourneyComponent,
    TriageFormComponent,
    CollectPersonalInfoFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
