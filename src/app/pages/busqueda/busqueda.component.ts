import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../Services/country.service';
import { Country } from '../../models/country.interface';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  allCountries: Country[] = [];
  filteredCountries: Country[] = [];
  pagedCountries: Country[] = [];
  favorites: Country[] = [];
  regions: string[] = [];

  searchTerm = '';
  selectedRegion = '';
  loading = true;
  error = false;

  currentPage = 1;
  readonly pageSize = 20;

  private regionClasses: Record<string, string> = {
    Africa:    'region-africa',
    Americas:  'region-americas',
    Asia:      'region-asia',
    Europe:    'region-europe',
    Oceania:   'region-oceania',
    Antarctic: 'region-antarctic'
  };

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('favoritos');
    if (saved) this.favorites = JSON.parse(saved);

    this.countryService.getCountries().subscribe({
      next: (countries) => {
        this.allCountries = countries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        this.filteredCountries = this.allCountries;

        const regionSet = new Set(countries.map(c => c.region).filter(Boolean));
        this.regions = Array.from(regionSet).sort();

        this.updatePage();
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredCountries = this.allCountries.filter(c => {
      const matchSearch = !term || c.name.common.toLowerCase().includes(term);
      const matchRegion = !this.selectedRegion || c.region === this.selectedRegion;
      return matchSearch && matchRegion;
    });
    this.currentPage = 1;
    this.updatePage();
  }

  filterByRegion(region: string): void {
    this.selectedRegion = this.selectedRegion === region ? '' : region;
    this.search();
  }

  updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedCountries = this.filteredCountries.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCountries.length / this.pageSize);
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2;
    const range: number[] = [];
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }
    if (current - delta > 2) range.unshift(-1);
    if (current + delta < total - 1) range.push(-1);
    if (total > 1) {
      range.unshift(1);
      if (total > 1) range.push(total);
    }
    return [...new Set(range)];
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.updatePage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isFavorite(country: Country): boolean {
    return this.favorites.some(f => f.cca3 === country.cca3);
  }

  toggleFavorite(country: Country): void {
    this.favorites = this.isFavorite(country)
      ? this.favorites.filter(f => f.cca3 !== country.cca3)
      : [...this.favorites, country];
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

  clearSearch(): void {
    this.searchTerm = '';
    this.search();
  }
}
