import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CelebratingService } from '../celebrating.service';
import { Country } from '../core/models/country';
import { Holiday } from '../core/models/holiday';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  countriesList$!: Observable<Country[]>;
  randomHolidays$!: Observable<Holiday[]>;
  countriesByCode$!: Observable<Map<string, string>>;

  private celebratingService = inject(CelebratingService);

  ngOnInit() {
    this.countriesList$ = this.celebratingService.getAllCountries();
    this.countriesByCode$ = this.countriesList$.pipe(
      map((list: Country[]) => new Map(list.map((c: Country) => [c.countryCode, c.name]))),
    );
    this.randomHolidays$ = this.celebratingService.getRandomHolidays();
  }
}
