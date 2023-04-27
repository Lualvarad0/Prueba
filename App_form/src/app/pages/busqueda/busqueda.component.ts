import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { CountryService } from '../../Services/country.service';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  paises: any = [];
  favoritos: any = [];


  constructor(private CountryService: CountryService, private authService: AuthService) {
    console.log("El component se ha creado");
  }

  ngOnInit(): void {
    console.log(" El componente se ha inicializado ");
    // consumiendo petición HTTP de la lista de países
    this.CountryService.getCountry().subscribe(
      ((response: any) => this.paises = response),
      ((error: any) => console.log(error))
    );
  }
  agregarFavorito(pais: any): void {
    if (!this.esFavorito(pais)) {
      this.favoritos.push(pais);
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    }
  }
  eliminarFavorito(pais: any): void {
    const index = this.favoritos.indexOf(pais);
    if (index !== -1) {
      this.favoritos.splice(index, 1);
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    }
  }

  esFavorito(pais: any): boolean {
    return this.favoritos.includes(pais);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  buscarPais(busqueda: string): void {
  this.CountryService.getCountry().subscribe(
    ((response: any) => {
      this.paises = response.filter((pais: any) =>
        pais.name.toLowerCase().includes(busqueda.toLowerCase())
      );
    }),
    ((error: any) => console.log(error))
  );
}

}


