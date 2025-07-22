import { Routes } from '@angular/router';
 // adjust path as needed
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { Dashboard } from './pages/dashboard';
import { Homepage } from './pages/homepage/homepage';

export const routes: Routes = [
  {
    path: '',
    component: Homepage,  // show homepage on root
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: '**',
    redirectTo: '',  // redirect unknown routes to homepage
  }
];
