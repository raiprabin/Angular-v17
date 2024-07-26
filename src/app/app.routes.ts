import {Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {authGuard} from './guard/auth.guard';
import {DashboardComponent} from './components/home/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [authGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  // { path: 'login', loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent) },
  // { path: 'register', loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent) },
  // { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
];
