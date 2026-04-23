import { Component } from '@angular/core';

interface Settings {
  notificaciones: boolean;
  autoguardado: boolean;
  mostrarPoblacion: boolean;
  idioma: string;
  resultadosPorPagina: number;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  settings: Settings;
  guardado = false;

  readonly idiomas = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Português' }
  ];

  readonly paginaOpciones = [10, 20, 50, 100];

  constructor() {
    const stored = localStorage.getItem('app_settings');
    this.settings = stored ? JSON.parse(stored) : {
      notificaciones: true,
      autoguardado: true,
      mostrarPoblacion: true,
      idioma: 'es',
      resultadosPorPagina: 20
    };
  }

  get favoritosCount(): number {
    const saved = localStorage.getItem('favoritos');
    return saved ? JSON.parse(saved).length : 0;
  }

  guardarConfiguracion(): void {
    localStorage.setItem('app_settings', JSON.stringify(this.settings));
    this.guardado = true;
    setTimeout(() => (this.guardado = false), 2500);
  }
}
