import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CelebrateIt';
  router = inject(Router);
}
