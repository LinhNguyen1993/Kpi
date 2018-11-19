import { LoginComponentGuardService } from './core/services/login-component-guard.service';
import { AuthService } from './core/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SecureGuardService } from './core/services/secure-guard.service';
import { CarComponent } from './car/car.component';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        CarComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [LoginComponentGuardService] },            
            { path: 'home', component: HomeComponent, canActivate: [SecureGuardService] },            
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent, canActivate: [LoginComponentGuardService] },
            { path: 'car', component: CarComponent, canActivate: [SecureGuardService] },
        ]),
        ReactiveFormsModule,
    ],
    providers: [
        AuthService,
        LoginComponentGuardService,
        SecureGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
