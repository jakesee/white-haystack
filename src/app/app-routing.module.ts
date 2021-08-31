import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { JourneyComponent } from './page/journey/journey.component';
import { WaitingRoomComponent } from './page/waiting-room/waiting-room.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'service', component: JourneyComponent, canActivate: [AuthenticationService] },
  { path: 'public', component: JourneyComponent },
  { path: 'waiting-room', component: WaitingRoomComponent, canActivate: [AuthenticationService] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
