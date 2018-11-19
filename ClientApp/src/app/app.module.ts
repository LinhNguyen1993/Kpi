import { LoginComponentGuardService } from './core/services/login-component-guard.service';
import { AuthService } from './core/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SecureGuardService } from './core/services/secure-guard.service';
import { CarComponent } from './car/car.component';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available                
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem(environment.tokenName)}`,
                    "Content-Type": "application/json",
                }
            });         
        return next.handle(request);
    }
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
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        AuthService,
        LoginComponentGuardService,
        SecureGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
