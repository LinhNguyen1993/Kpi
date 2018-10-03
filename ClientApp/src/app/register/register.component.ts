import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public model: RegisterModel = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  public email: string;
  public password: string;
  public confirmPassword: string;
  public http: HttpClient;
  public baseUrl: string;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }
  @Inject('BASE_URL')
  register() {    
    this.model.email = this.email;
    this.model.password = this.password;
    this.model.confirmPassword = this.confirmPassword;
    var model = this.model
    this.http.post<RegisterModel>(this.baseUrl + 'api/SampleData/register', JSON.stringify(model),this.headers).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }
}

interface RegisterModel {
  email: string;
  password: string;
  confirmPassword: string;
}
