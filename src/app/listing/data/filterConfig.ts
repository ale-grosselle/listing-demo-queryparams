import type { FilterGroup, ListingCategory } from '../types';

const CARS_FILTERS: FilterGroup[] = [
  {
    key: 'brand',
    label: 'Brand',
    type: 'select',
    options: [
      { value: 'alfa-romeo', label: 'Alfa Romeo' },
      { value: 'audi', label: 'Audi' },
      { value: 'bmw', label: 'BMW' },
      { value: 'fiat', label: 'Fiat' },
      { value: 'ford', label: 'Ford' },
      { value: 'hyundai', label: 'Hyundai' },
      { value: 'jeep', label: 'Jeep' },
      { value: 'kia', label: 'Kia' },
      { value: 'mercedes', label: 'Mercedes-Benz' },
      { value: 'nissan', label: 'Nissan' },
      { value: 'opel', label: 'Opel' },
      { value: 'peugeot', label: 'Peugeot' },
      { value: 'renault', label: 'Renault' },
      { value: 'skoda', label: 'Skoda' },
      { value: 'tesla', label: 'Tesla' },
      { value: 'toyota', label: 'Toyota' },
      { value: 'volkswagen', label: 'Volkswagen' },
    ],
  },
  {
    key: 'price_min',
    label: 'Min Price (€)',
    type: 'range-min',
    options: [
      { value: '5000', label: '€5,000' },
      { value: '10000', label: '€10,000' },
      { value: '15000', label: '€15,000' },
      { value: '20000', label: '€20,000' },
      { value: '30000', label: '€30,000' },
    ],
  },
  {
    key: 'price_max',
    label: 'Max Price (€)',
    type: 'range-max',
    options: [
      { value: '10000', label: '€10,000' },
      { value: '15000', label: '€15,000' },
      { value: '20000', label: '€20,000' },
      { value: '30000', label: '€30,000' },
      { value: '50000', label: '€50,000' },
    ],
  },
  {
    key: 'year_min',
    label: 'Min Year',
    type: 'range-min',
    options: [
      { value: '2015', label: '2015' },
      { value: '2017', label: '2017' },
      { value: '2019', label: '2019' },
      { value: '2020', label: '2020' },
      { value: '2021', label: '2021' },
      { value: '2022', label: '2022' },
    ],
  },
  {
    key: 'fuel',
    label: 'Fuel Type',
    type: 'select',
    options: [
      { value: 'petrol', label: 'Petrol' },
      { value: 'diesel', label: 'Diesel' },
      { value: 'hybrid', label: 'Hybrid' },
      { value: 'electric', label: 'Electric' },
    ],
  },
  {
    key: 'transmission',
    label: 'Transmission',
    type: 'select',
    options: [
      { value: 'manual', label: 'Manual' },
      { value: 'automatic', label: 'Automatic' },
    ],
  },
  {
    key: 'condition',
    label: 'Condition',
    type: 'select',
    options: [
      { value: 'new', label: 'New' },
      { value: 'used', label: 'Used' },
    ],
  },
  {
    key: 'region',
    label: 'Region',
    type: 'select',
    options: [
      { value: 'campania', label: 'Campania' },
      { value: 'emilia-romagna', label: 'Emilia-Romagna' },
      { value: 'lazio', label: 'Lazio' },
      { value: 'lombardia', label: 'Lombardia' },
      { value: 'piemonte', label: 'Piemonte' },
      { value: 'sicilia', label: 'Sicilia' },
      { value: 'toscana', label: 'Toscana' },
      { value: 'veneto', label: 'Veneto' },
    ],
  },
];

const REAL_ESTATE_FILTERS: FilterGroup[] = [
  {
    key: 'price_min',
    label: 'Min Price (€)',
    type: 'range-min',
    options: [
      { value: '50000', label: '€50,000' },
      { value: '100000', label: '€100,000' },
      { value: '200000', label: '€200,000' },
      { value: '300000', label: '€300,000' },
      { value: '500000', label: '€500,000' },
    ],
  },
  {
    key: 'price_max',
    label: 'Max Price (€)',
    type: 'range-max',
    options: [
      { value: '100000', label: '€100,000' },
      { value: '200000', label: '€200,000' },
      { value: '300000', label: '€300,000' },
      { value: '500000', label: '€500,000' },
      { value: '1000000', label: '€1,000,000' },
    ],
  },
  {
    key: 'condition',
    label: 'Condition',
    type: 'select',
    options: [
      { value: 'new', label: 'New build' },
      { value: 'used', label: 'Resale' },
    ],
  },
  {
    key: 'region',
    label: 'Region',
    type: 'select',
    options: [
      { value: 'campania', label: 'Campania' },
      { value: 'emilia-romagna', label: 'Emilia-Romagna' },
      { value: 'lazio', label: 'Lazio' },
      { value: 'lombardia', label: 'Lombardia' },
      { value: 'piemonte', label: 'Piemonte' },
      { value: 'sicilia', label: 'Sicilia' },
      { value: 'toscana', label: 'Toscana' },
      { value: 'veneto', label: 'Veneto' },
    ],
  },
];

const GENERAL_FILTERS: FilterGroup[] = [
  {
    key: 'price_min',
    label: 'Min Price (€)',
    type: 'range-min',
    options: [
      { value: '10', label: '€10' },
      { value: '50', label: '€50' },
      { value: '100', label: '€100' },
      { value: '500', label: '€500' },
    ],
  },
  {
    key: 'price_max',
    label: 'Max Price (€)',
    type: 'range-max',
    options: [
      { value: '50', label: '€50' },
      { value: '100', label: '€100' },
      { value: '500', label: '€500' },
      { value: '1000', label: '€1,000' },
      { value: '5000', label: '€5,000' },
    ],
  },
  {
    key: 'condition',
    label: 'Condition',
    type: 'select',
    options: [
      { value: 'new', label: 'New' },
      { value: 'used', label: 'Used' },
    ],
  },
  {
    key: 'region',
    label: 'Region',
    type: 'select',
    options: [
      { value: 'campania', label: 'Campania' },
      { value: 'emilia-romagna', label: 'Emilia-Romagna' },
      { value: 'lazio', label: 'Lazio' },
      { value: 'lombardia', label: 'Lombardia' },
      { value: 'piemonte', label: 'Piemonte' },
      { value: 'sicilia', label: 'Sicilia' },
      { value: 'toscana', label: 'Toscana' },
      { value: 'veneto', label: 'Veneto' },
    ],
  },
];

export const FILTER_CONFIG_BY_CATEGORY: Record<ListingCategory, FilterGroup[]> = {
  cars: CARS_FILTERS,
  'real-estate': REAL_ESTATE_FILTERS,
  general: GENERAL_FILTERS,
};
