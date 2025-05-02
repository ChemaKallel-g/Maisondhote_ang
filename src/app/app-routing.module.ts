import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationpageComponent } from './reservationpage/reservationpage.component';
import { MaisondhotelistComponent } from './Maisondhotelist/Maisondhotelist.component';
import { AdminpalaceComponent } from './adminpalace/adminpalace.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
  },
  { 
    path: 'signup', 
    redirectTo: '/register',
    pathMatch: 'full'
  },
  {
    path: 'Maisondhotebook',
    pathMatch: 'full',
    component: ReservationpageComponent,
  },
  {
    path: 'Maisondhotelist',
    pathMatch: 'full',
    component: MaisondhotelistComponent,
  },
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminpalaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
