import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';

export const routes_auth: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: AuthLoginComponent },
      { path: 'register', component: AuthRegisterComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
];
