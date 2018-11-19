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
  error: any = null;
  cars: any = [];

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string, ) { }

  ngOnInit() {
    this.getCars();
  }

  addNewCar() {
    let model: CarModel = new CarModel(this.name, this.price, this.description);
    this.http.post<any>(this.baseUrl + 'Car/AddNewCar', JSON.stringify(model)
    ).subscribe(result => {
      this.getCars();
    }, error => {
      this.error = error.error;
    });
  }

  getCars() {
    this.http.get<any>(this.baseUrl + 'Car/GetAllCars'
    ).subscribe(result => {
      this.cars = result;
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
