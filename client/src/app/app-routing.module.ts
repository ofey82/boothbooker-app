import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [authGuard],
    data: { context: 'main' },
  },
  {
    path: 'events',
    component: EventListComponent,
    canActivate: [authGuard],
    data: { context: 'userEvents' },
  },
  {
    path: 'event/:id',
    component: EventDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'create-event',
    component: CreateEventComponent,
    canActivate: [authGuard],
  },
  { path: 'requests', component: RequestsComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
