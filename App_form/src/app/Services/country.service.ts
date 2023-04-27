import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CountryService{

  constructor(private http: HttpClient) {
  console.log('Service HTTP');
  }

  getCountry():any {
    return this.http.get('https://restcountries.com/v2/all');
  }
}
