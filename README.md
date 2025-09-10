# CelebrateIt

A modern Angular application that helps you discover public holidays from countries around the world. Built with Angular 19 and Angular Material for a beautiful, responsive user experience.

## Features

- **🌍 Global Holiday Discovery**: Browse public holidays from countries worldwide
- **🔍 Smart Search**: Find countries quickly with autocomplete search functionality
- **📱 Year Navigation**: Explore holidays for different years (current year ± 5 years)
- **⚡ Real-time Data**: Fetches live holiday data from the Nager.Date API
- **🔄 Random Holiday Showcase**: Discover interesting holidays from around the world

## Screenshots

![App Screenshot](https://drive.usercontent.google.com/download?id=1xAu4q5r2lGxyflUmzoRyJuhcQaShdzQr&export=view&authuser=0)

![App Screenshot](https://drive.usercontent.google.com/download?id=1eG-cTdy7iQ2aP2SIXwjYIbl3n9GsPnx_&export=view&authuser=0)

![App Screenshot](https://drive.usercontent.google.com/download?id=1Zh15gK4yWwUfO3Z4FObucJlkNSq-o3hZ&export=view&authuser=0)

![App Screenshot](https://drive.google.com/uc?export=view&id=10ZOkfl88MwqA5IHE6x37y4EwHixVijsK)

## Tech Stack

- **Frontend Framework**: Angular 19
- **UI Library**: Angular Material 19
- **Language**: TypeScript 5.7
- **Styling**: SCSS
- **State Management**: RxJS Observables
- **Routing**: Angular Router
- **Forms**: Angular Reactive Forms
- **Linting**: ESLint with Prettier
- **Build Tool**: Angular CLI

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Open your browser

Navigate to `http://localhost:4200` to view the application.

## Environment Variables

The application uses environment configuration files located in `src/environments/`:

### Production Environment (`environment.ts`)

```typescript
export const environment = {
  API_URL: 'https://date.nager.at/api/v3',
};
```

### Development Environment (`environment.development.ts`)

```typescript
export const environment = {
  API_URL: 'https://date.nager.at/api/v3',
};
```

## API Reference

The application integrates with the [Nager.Date API](https://date.nager.at/) to fetch holiday data.

### Endpoints Used

#### Get Available Countries

```http
GET https://date.nager.at/api/v3/AvailableCountries
```

Returns a list of all available countries with their country codes.

**Response:**

```json
[
  {
    "countryCode": "US",
    "name": "United States"
  }
]
```

#### Get Public Holidays for a Country

```http
GET https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}
```

**Parameters:**

- `year` (number): The year to fetch holidays for
- `countryCode` (string): ISO 3166-1 alpha-2 country code

**Response:**

```json
[
  {
    "date": "2024-01-01",
    "localName": "New Year's Day",
    "name": "New Year's Day",
    "countryCode": "US",
    "fixed": true,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": ["Public"]
  }
]
```

#### Get Next Public Holidays Worldwide

```http
GET https://date.nager.at/api/v3/NextPublicHolidaysWorldwide
```

Returns upcoming public holidays from around the world.

### Data Models

#### Country Interface

```typescript
interface Country {
  countryCode: string;
  name: string;
}
```

#### Holiday Interface

```typescript
interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}
```

## Acknowledgements

- [Nager.Date API](https://date.nager.at/) for providing comprehensive holiday data
- Angular Material team for the excellent UI components
- The Angular team for the amazing framework

---

Made with ❤️ using Angular
