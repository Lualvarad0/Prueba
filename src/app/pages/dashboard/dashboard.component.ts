import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../Services/country.service';
import { Country } from '../../models/country.interface';

interface RegionStat {
  name: string;
  count: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = true;
  error = false;
  totalCountries = 0;
  totalFavorites = 0;
  totalRegions = 0;
  largestCountry = '';
  regions: RegionStat[] = [];
  recentFavorites: Country[] = [];

  private regionColors: Record<string, string> = {
    Africa:    '#f59e0b',
    Americas:  '#10b981',
    Asia:      '#3b82f6',
    Europe:    '#8b5cf6',
    Oceania:   '#ec4899',
    Antarctic: '#64748b'
  };

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
    const favorites: Country[] = saved ? JSON.parse(saved) : [];
    this.totalFavorites = favorites.length;
    this.recentFavorites = favorites.slice(0, 5);

    this.countryService.getCountries().subscribe({
      next: (countries) => {
        this.totalCountries = countries.length;
        const regionMap: Record<string, number> = {};
        let maxPop = 0;

        countries.forEach(c => {
          regionMap[c.region] = (regionMap[c.region] || 0) + 1;
          if (c.population > maxPop) {
            maxPop = c.population;
            this.largestCountry = c.name.common;
          }
        });

        this.totalRegions = Object.keys(regionMap).length;
        this.regions = Object.entries(regionMap)
          .map(([name, count]) => ({ name, count, color: this.regionColors[name] || '#64748b' }))
          .sort((a, b) => b.count - a.count);

        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  getBarWidth(count: number): number {
    return this.totalCountries > 0 ? (count / this.totalCountries) * 100 : 0;
  }

  getRegionClass(region: string): string {
    return this.regionClasses[region] || 'region-antarctic';
  }
}
