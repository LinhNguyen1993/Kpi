import { environment } from './../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  name: string;
  price: number;
  description: string;
  error : any = null;
  private token = localStorage.getItem(environment.tokenName);

  private headers = {    
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json"      
    })
  };

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,) { }

  ngOnInit() {
    this.getCars();
  }

  addNewCar() {    
    // this.headers.headers.append('Content-Type', 'application/json');
    // let authToken = localStorage.getItem(environment.tokenName);
    // this.headers.headers.append('Authorization', `Bearer ${authToken}`);

    let model : CarModel = new CarModel(this.name,this.price,this.description);   
    this.http.post<any>(this.baseUrl + 'Car/AddNewCar', JSON.stringify(model), {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      })
    }).subscribe(result => {
      console.log(result);      
    }, error => {
      this.error = error.error;
    });
  }

  getCars() {    
    this.http.get<any>(this.baseUrl + 'Car/GetAllCars', {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      })
    }).subscribe(result => {
      console.log(result);      
    }, error => {
      this.error = error.error;
    });
  }
}

export class CarModel {
  constructor(name: string, price: number, description: string) {
    this.Name = name;
    this.Price = price;
    this.Description = description
  }
  Name: string;
  Price: number;
  Description: string;
}
