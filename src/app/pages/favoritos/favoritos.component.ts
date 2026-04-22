import { Component, OnInit } from '@angular/core';
import { Country } from '../../models/country.interface';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favorites: Country[] = [];

  private regionClasses: Record<string, string> = {
    Africa:    'region-africa',
    Americas:  'region-americas',
    Asia:      'region-asia',
    Europe:    'region-europe',
    Oceania:   'region-oceania',
    Antarctic: 'region-antarctic'
  };

  ngOnInit(): void {
    const saved = localStorage.getItem('favoritos');
    this.favorites = saved ? JSON.parse(saved) : [];
  }

  removeFavorite(country: Country): void {
    this.favorites = this.favorites.filter(f => f.cca3 !== country.cca3);
    localStorage.setItem('favoritos', JSON.stringify(this.favorites));
  }

  getCapital(country: Country): string {
    return country.capital?.[0] ?? '—';
  }

  getCurrencyInfo(country: Country): string {
    if (!country.currencies) return '—';
    const first = Object.values(country.currencies)[0];
    return `${first.name} (${first.symbol})`;
  }

  getLanguage(country: Country): string {
    if (!country.languages) return '—';
    return Object.values(country.languages)[0];
  }

  getRegionClass(region: string): string {
    return this.regionClasses[region] || 'region-antarctic';
  }
}
