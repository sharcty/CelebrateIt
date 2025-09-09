import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CelebratingService } from '../celebrating.service';
import { Holiday } from '../core/models/holiday';
import { MatList, MatListItem } from '@angular/material/list';
import { MatListItemLine } from '@angular/material/list';
import { FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-country-page',
  imports: [
    AsyncPipe,
    MatList,
    MatListItem,
    MatListItemLine,
    MatButtonToggleGroup,
    MatButtonToggle,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  standalone: true,
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss',
})
export class CountryPageComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  countryCode: string | null = null;
  countryHolidays$!: Observable<Holiday[]>;
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: 11 }, (_, i) => this.currentYear - 5 + i);
  isMobile = false;

  private destroy$ = new Subject<void>();

  private celebratingService = inject(CelebratingService);
  yearControl = new FormControl(this.currentYear);

  ngOnInit() {
    this.checkScreenSize();

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.countryCode = params.get('countryCode') || '';
      this.loadHolidays();
    });

    this.yearControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((year) => {
      if (year && this.countryCode) {
        this.currentYear = year;
        this.loadHolidays();
      }
    });
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 800;
  }

  private loadHolidays() {
    if (this.countryCode) {
      this.countryHolidays$ = this.celebratingService.getHolidays(this.countryCode, this.currentYear);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
