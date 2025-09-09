import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Country } from './core/models/country';
import { Holiday } from './core/models/holiday';

@Injectable({
  providedIn: 'root',
})
export class CelebratingService {
  constructor() {}

  private http = inject(HttpClient);

  getAllCountries(): Observable<Country[]> {
    return this.http.get<any>(`${environment.API_URL}/AvailableCountries`).pipe(
      catchError((error) => {
        console.error('Error fetching countries:', error);
        return of([]);
      }),
    );
  }

  getRandomHolidays(randNum: number = 3): Observable<Holiday[]> {
    return this.http.get<any>(`${environment.API_URL}/NextPublicHolidaysWorldwide`).pipe(
      map((countries) => {
        const shuffled = [...countries];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, randNum);
      }),
    );
  }

  getHolidays(countryCode: string, year: number): Observable<Holiday[]> {
    return this.http.get<any>(`${environment.API_URL}/PublicHolidays/${year}/${countryCode}`).pipe(
      catchError((error) => {
        console.error(`Error fetching holidays for ${countryCode}:`, error);
        return of([]);
      }),
    );
  }
}
