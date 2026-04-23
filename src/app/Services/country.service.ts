import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly apiUrl =
    '/api/v3.1/all?fields=name,capital,region,subregion,currencies,languages,flags,population,cca3';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }
}
