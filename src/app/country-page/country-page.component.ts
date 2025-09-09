import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  imports: [],
  standalone: true,
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss',
})
export class CountryPageComponent {
  private route = inject(ActivatedRoute);
  countryCode: string | null = null;

  ngOnInit() {
    this.countryCode = this.route.snapshot.paramMap.get('countryCode');
  }
}
