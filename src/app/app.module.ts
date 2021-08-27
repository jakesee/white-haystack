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
import { HeaderComponent } from './header/header.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { DataService } from './data.service';

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
    HeaderComponent,
    HomeComponent,
    WaitingRoomComponent,
    JourneyComponent,
    TriageFormComponent,
    CollectPersonalInfoFormComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
