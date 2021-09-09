import { NgModule, Type } from '@angular/core';
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
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faRobot, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { EmergencyFormComponent } from './form/emergency-form/emergency-form.component';
import { SymptomsSectionComponent } from './sections/symptoms-section/symptoms-section.component';
import { OnetwothreeSectionComponent } from './sections/onetwothree-section/onetwothree-section.component';
import { BannerSectionComponent } from './sections/banner-section/banner-section.component';
import { NeedAssistanceSectionComponent } from './sections/need-assistance-section/need-assistance-section.component';
import { NextAppointmentInfoFormComponent } from './form/next-appointment-info-form/next-appointment-info-form.component';
import { RequestAppointmentFormComponent } from './form/request-appointment-form/request-appointment-form.component';
import { ExploreComponent } from './page/explore/explore.component';
import { ProviderComponent } from './page/provider/provider.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
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
    EmergencyFormComponent,
    SymptomsSectionComponent,
    OnetwothreeSectionComponent,
    BannerSectionComponent,
    NeedAssistanceSectionComponent,
    NextAppointmentInfoFormComponent,
    RequestAppointmentFormComponent,
    ExploreComponent,
    ProviderComponent,
  ],
  providers: [DataService, AuthenticationService, mockHttpProviderService],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faBars, faSignInAlt, faSignOutAlt, faRobot);
  }
}
