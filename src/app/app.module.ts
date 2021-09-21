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
import { faAngleDoubleDown, faBars, faBell, faCalendarAlt, faClinicMedical, faClock, faComment, faComments, faFilePrescription, faGlobeAsia, faHeart, faHome, faIdCard, faMoneyBillAlt, faNewspaper, faRobot, faRoute, faSearch, faSignInAlt, faSignOutAlt, faTasks, faUser, faVideo, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { EmergencyFormComponent } from './form/emergency-form/emergency-form.component';
import { SymptomsSectionComponent } from './sections/symptoms-section/symptoms-section.component';
import { OnetwothreeSectionComponent } from './sections/onetwothree-section/onetwothree-section.component';
import { BannerSectionComponent } from './sections/banner-section/banner-section.component';
import { NeedAssistanceSectionComponent } from './sections/need-assistance-section/need-assistance-section.component';
import { NextAppointmentInfoFormComponent } from './form/next-appointment-info-form/next-appointment-info-form.component';
import { RequestAppointmentFormComponent } from './form/request-appointment-form/request-appointment-form.component';
import { ExploreComponent } from './page/explore/explore.component';
import { ProviderComponent } from './page/provider/provider.component';
import { ProfileComponent } from './page/profile/profile.component';
import { SwitchControlComponent } from './control/switch-control/switch-control.component';
import { CareNetworkComponent } from './page/care-network/care-network.component';
import { FooterComponent } from './page/footer/footer.component';
import { TitleBarSectionComponent } from './sections/title-bar-section/title-bar-section.component';
import { ProviderEligibilityFormComponent } from './form/provider-eligibility-form/provider-eligibility-form.component';
import { ProviderCardControlComponent } from './control/provider-card-control/provider-card-control.component';
import { SubProvidersSectionComponent } from './sections/sub-providers-section/sub-providers-section.component';
import { AppointmentCardControlComponent } from './control/appointment-card-control/appointment-card-control.component';
import { ChatControlComponent } from './control/chat-control/chat-control.component';
import { TourComponent } from './page/tour/tour.component';
import { TagControlComponent } from './control/tag-control/tag-control.component';
import { AutofocusDirective } from './shared/autofocus.directive';
import { FeedsComponent } from './page/feeds/feeds.component';


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
    ProfileComponent,
    SwitchControlComponent,
    CareNetworkComponent,
    FooterComponent,
    TitleBarSectionComponent,
    ProviderEligibilityFormComponent,
    ProviderCardControlComponent,
    SubProvidersSectionComponent,
    AppointmentCardControlComponent,
    ChatControlComponent,
    TourComponent,
    TagControlComponent,
    AutofocusDirective,
    FeedsComponent,
  ],
  providers: [DataService, AuthenticationService, mockHttpProviderService],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faBars,
      faSignInAlt,
      faSignOutAlt,
      faRobot,
      faWindowClose,
      faSearch,
      faHome,
      faHeart,
      faNewspaper,
      faUser,
      faIdCard,
      faClock,
      faCalendarAlt,
      faComment,
      faComments,
      faBell,
      faVideo,
      faTasks,
      faFilePrescription,
      faClinicMedical,
      faMoneyBillAlt,
      faAngleDoubleDown,
      faRoute,
      faGlobeAsia
    );
  }
}
