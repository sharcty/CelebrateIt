import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CelebratingService } from '../celebrating.service';
import { Holiday } from '../core/models/holiday';
import { MatList, MatListItem } from '@angular/material/list';
import { MatListItemLine } from '@angular/material/list';
import { FormControl, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';

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
  yearControl = new FormControl();

  private destroy$ = new Subject<void>();

  private celebratingService = inject(CelebratingService);

  ngOnInit() {
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
