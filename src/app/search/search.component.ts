import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { CelebratingService } from '../celebrating.service';
import { Country } from '../core/models/country';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, MatCardModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  countriesList$!: Observable<Country[]>;
  selectedCountry = new FormControl('');
  filteredCountries: Observable<Country[]> = of([]);

  private celebratingService = inject(CelebratingService);
  private router = inject(Router);

  ngOnInit() {
    this.countriesList$ = this.celebratingService.getAllCountries();
    this.filteredCountries = this.selectedCountry.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.countriesList$.pipe(map((countries) => this._filterCountry(countries, value || '')))),
    );
  }

  private _filterCountry(countries: Country[], value: string): Country[] {
    const filterValue = value.toLowerCase();
    return countries.filter((country) => country.name.toLowerCase().includes(filterValue));
  }

  navigateToCountry(countryCode: string) {
    this.router.navigate(['/country', countryCode]);
  }
}
