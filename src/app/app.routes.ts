import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryPageComponent } from './country-page/country-page.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Main page',
  },
  {
    path: 'country/:countryCode',
    component: CountryPageComponent,
    title: 'Country page',
  },
];
