import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './patient-app/page/home/home.component';
import { TriageFormComponent } from './patient-app/form/triage-form/triage-form.component';
import { JourneyComponent } from './patient-app/page/journey/journey.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CollectPersonalInfoFormComponent } from './patient-app/form/collect-personal-info-form/collect-personal-info-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './patient-app/page/header/header.component';
import { WaitingRoomComponent } from './patient-app/page/waiting-room/waiting-room.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { AuthenticationService } from './auth/authentication.service';
import { mockHttpProviderService } from './mock-http-provider.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressBook, faAngleDoubleDown, faBars, faBell, faCalendarAlt, faClinicMedical, faClock, faComment, faComments, faFilePrescription, faGlobeAsia, faHeart, faHome, faIdCard, faInfoCircle, faMoneyBillAlt, faNewspaper, faRobot, faRoute, faSearch, faSignInAlt, faSignOutAlt, faTasks, faUser, faVideo, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { EmergencyFormComponent } from './patient-app/form/emergency-form/emergency-form.component';
import { SymptomsSectionComponent } from './patient-app/sections/symptoms-section/symptoms-section.component';
import { OnetwothreeSectionComponent } from './patient-app/sections/onetwothree-section/onetwothree-section.component';
import { BannerSectionComponent } from './patient-app/sections/banner-section/banner-section.component';
import { NeedAssistanceSectionComponent } from './patient-app/sections/need-assistance-section/need-assistance-section.component';
import { NextAppointmentInfoFormComponent } from './patient-app/form/next-appointment-info-form/next-appointment-info-form.component';
import { RequestAppointmentFormComponent } from './patient-app/form/request-appointment-form/request-appointment-form.component';
import { ProviderComponent } from './patient-app/page/provider/provider.component';
import { ProfileComponent } from './patient-app/page/profile/profile.component';
import { SwitchControlComponent } from './control/switch-control/switch-control.component';
import { CareNetworkComponent } from './patient-app/page/care-network/care-network.component';
import { FooterComponent } from './patient-app/page/footer/footer.component';
import { TitleBarSectionComponent } from './patient-app/sections/title-bar-section/title-bar-section.component';
import { ProviderEligibilityFormComponent } from './patient-app/form/provider-eligibility-form/provider-eligibility-form.component';
import { ProviderCardControlComponent } from './control/provider-card-control/provider-card-control.component';
import { SubProvidersSectionComponent } from './patient-app/sections/sub-providers-section/sub-providers-section.component';
import { AppointmentCardControlComponent } from './control/appointment-card-control/appointment-card-control.component';
import { ChatControlComponent } from './control/chat-control/chat-control.component';
import { TourComponent } from './patient-app/page/tour/tour.component';
import { TagControlComponent } from './control/tag-control/tag-control.component';
import { AutofocusDirective } from './shared/autofocus.directive';
import { FeedsComponent } from './patient-app/page/feeds/feeds.component';
import { MedicalProfileFormComponent } from './patient-app/form/medical-profile-form/medical-profile-form.component';
import { CategorySectionComponent } from './patient-app/sections/category-section/category-section.component';
import { RecentProvidersSectionComponent } from './patient-app/sections/recent-providers-section/recent-providers-section.component';
import { RecentFeedsSectionComponent } from './patient-app/sections/recent-feeds-section/recent-feeds-section.component';
import { HtmlFormComponent } from './patient-app/form/html-form/html-form.component';
import { SelectAccountFormComponent } from './patient-app/form/select-account-form/select-account-form.component';
import { ThemesGuideComponent } from './patient-app/page/themes-guide/themes-guide.component';
import { MatSliderModule } from '@angular/material/slider'
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './patient-app/page/register/register.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BillEditComponent } from './concierge-app/bill-edit/bill-edit.component';
import { NavigationComponent } from './concierge-app/navigation/navigation.component';
import { EpisodeListComponent } from './concierge-app/episode-list/episode-list.component';
import { ConciergeAppComponent } from './concierge-app/concierge-app.component';
import { InvoiceControllerService } from './invoice-controller.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { PatientAppComponent } from './patient-app/patient-app.component';
import { AppSelectorComponent } from './app-selector/app-selector.component';
import { AngularSplitModule } from 'angular-split';



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
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatToolbarModule,
    MatExpansionModule,
    AngularSplitModule
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
    MedicalProfileFormComponent,
    CategorySectionComponent,
    RecentProvidersSectionComponent,
    RecentFeedsSectionComponent,
    HtmlFormComponent,
    SelectAccountFormComponent,
    ThemesGuideComponent,
    RegisterComponent,
    BillEditComponent,
    NavigationComponent,
    EpisodeListComponent,
    ConciergeAppComponent,
    PatientAppComponent,
    AppSelectorComponent
  ],
  providers: [
    DataService,
    AuthenticationService,
    InvoiceControllerService,
    mockHttpProviderService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],

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
      faGlobeAsia,
      faInfoCircle,
      faAddressBook
    );
  }
}
