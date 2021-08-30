import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './page/home/home.component';
import { TriageFormComponent } from './form/triage-form/triage-form.component';
import { JourneyComponent } from './page/journey/journey.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CollectPersonalInfoFormComponent } from './form/collect-personal-info-form/collect-personal-info-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './page/header/header.component';
import { WaitingRoomComponent } from './page/waiting-room/waiting-room.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { AuthenticationService } from './auth/authentication.service';
import { mockHttpProviderService } from './mock-http-provider.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    WaitingRoomComponent,
    JourneyComponent,
    TriageFormComponent,
    CollectPersonalInfoFormComponent,
  ],
  providers: [DataService, AuthenticationService, mockHttpProviderService],
  bootstrap: [AppComponent],

})
export class AppModule {}
