import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { JourneyComponent } from './page/journey/journey.component';
import { WaitingRoomComponent } from './page/waiting-room/waiting-room.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'journey', component: JourneyComponent },
  { path: 'waiting-room', component: WaitingRoomComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
