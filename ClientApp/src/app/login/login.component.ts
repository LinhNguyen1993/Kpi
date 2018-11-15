import { AuthService } from './../core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  remember: boolean;
  error: any = null;
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    let model = new LoginModel(this.email, this.password, this.remember);
    this.http.post<any>(this.baseUrl + 'Account/Login', JSON.stringify(model), this.headers).subscribe(result => {
      console.log(result);
      this.authService.setAuth(result.token);
      this.router.navigate(["/home"]);
    }, error => {
      this.error = error.error;
    });
  }
}

export class LoginModel {
  constructor(email: string, password: string, remember: boolean) {
    this.email = email;
    this.password = password;
    this.remember = remember
  }
  public email: string;
  public password: string;
  public remember: boolean;
}
