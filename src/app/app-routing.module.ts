import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';
import { LoginComponent } from './auth/login/login.component';
import { CareNetworkComponent } from './patient-app/page/care-network/care-network.component';
import { HomeComponent } from './patient-app/page/home/home.component';
import { JourneyComponent } from './patient-app/page/journey/journey.component';
import { ProfileComponent } from './patient-app/page/profile/profile.component';
import { ProviderComponent } from './patient-app/page/provider/provider.component';
import { WaitingRoomComponent } from './patient-app/page/waiting-room/waiting-room.component';
import { TourComponent } from './patient-app/page/tour/tour.component';
import { FeedsComponent } from './patient-app/page/feeds/feeds.component';
import { ThemesGuideComponent } from './patient-app/page/themes-guide/themes-guide.component';
import { RegisterComponent } from './patient-app/page/register/register.component';
import { PatientAppComponent } from './patient-app/patient-app.component';
import { ConciergeAppComponent } from './concierge-app/concierge-app.component';
import { AppSelectorComponent } from './app-selector/app-selector.component';

const routes: Routes = [
  {
    path: 'patient', component: PatientAppComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'public', component: JourneyComponent },
      { path: 'care-network', component: CareNetworkComponent },
      { path: 'feeds', component: FeedsComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationService] },
      { path: 'public/tour', component: TourComponent },
      { path: 'provider/:pid/journey/:jid', component: JourneyComponent, canActivate: [AuthenticationService] },
      { path: 'provider/:pid', component: ProviderComponent, canActivate: [AuthenticationService] },
      { path: 'waiting-room', component: WaitingRoomComponent, canActivate: [AuthenticationService] },
      { path: 'profile/themes-guide', component: ThemesGuideComponent },
      { path: 'home', component: HomeComponent },
      { path: '**', component: HomeComponent },
    ]
  },
  { path: 'concierge', component: ConciergeAppComponent },
  { path: '**', component: AppSelectorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
