import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    // NgbModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass : AuthInterceptor,  multi:true },
    { provide:HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi:true },
  ],
})
export class AuthLayoutModule { }
