import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  private email: string;
  private password: string;
  private confirmPassword: string;
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  ngOnInit(): void {

    this.emailCtrl = new FormControl('email', [
      Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ]);
    this.passwordCtrl = new FormControl('', [
      Validators.required,
      Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]);
    this.confirmPasswordCtrl = new FormControl('', Validators.required);

    this.registerForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    },{ validators: this.checkConfirmPassword });
  }  

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  
  register() {
    var data = new RegisterModel(this.password, this.email, this.confirmPassword);
    this.http.post<RegisterModel>(this.baseUrl + 'Account/register', JSON.stringify(data), this.headers).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }

  checkConfirmPassword(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPassword = group.controls.confirmPassword.value;

    return pass === confirmPassword ? null : { notSame: true }
  }
}

export class RegisterModel {
  constructor(password?: string, email?: string, confirmPassword?: string) {

    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  public email: string;
  public password: string;
  public confirmPassword: string;

}