import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Obtener lista de favoritos del localStorage
    const favoritosStr = localStorage.getItem('favoritos');
    if (favoritosStr) {
      this.favoritos = JSON.parse(favoritosStr);
    } else {
      this.favoritos = [];
    }
  }

  eliminarFavorito(index: number) {
    // Eliminar país favorito de la lista y actualizar localStorage
    this.favoritos.splice(index, 1);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }
}
