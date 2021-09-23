import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';
import { LoginComponent } from './auth/login/login.component';
import { CareNetworkComponent } from './page/care-network/care-network.component';
import { HomeComponent } from './page/home/home.component';
import { JourneyComponent } from './page/journey/journey.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ProviderComponent } from './page/provider/provider.component';
import { WaitingRoomComponent } from './page/waiting-room/waiting-room.component';
import { TourComponent } from './page/tour/tour.component';
import { FeedsComponent } from './page/feeds/feeds.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'public', component: JourneyComponent },
  { path: 'care-network', component: CareNetworkComponent },
  { path: 'feeds', component: FeedsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationService] },
  { path: 'public/profile', component: ProfileComponent },
  { path: 'public/tour', component: TourComponent },
  { path: 'provider/:pid/journey/:jid', component: JourneyComponent, canActivate: [AuthenticationService] },
  { path: 'provider/:pid', component: ProviderComponent, canActivate: [AuthenticationService] },
  { path: 'waiting-room', component: WaitingRoomComponent, canActivate: [AuthenticationService] },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
