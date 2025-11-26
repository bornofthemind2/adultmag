export interface Product {
  id: string;
  title: string;
  issueDate: string;
  year: number;
  country: string;
  description: string;
  price: number;
  imageUrl: string;
  isFeatured: boolean;
  marketNotes?: string;
  actors?: string[];
  collectibleReason?: string;
}

export interface CartItem extends Product {
  quantity: number;
  variant: 'physical' | 'digital';
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

export interface FilterState {
  title: string;
  minYear: number;
  maxYear: number;
  minPrice: number;
  maxPrice: number;
  keyword: string;
}

export enum MagazineTitle {
  PLAYBOY = 'Playboy',
  BARELY_LEGAL = 'Barely Legal',
  HUSTLER = 'Hustler',
  PENTHOUSE = 'Penthouse',
  SPORTS_ILLUSTRATED = 'Sports Illustrated',
  CLUB_INTERNATIONAL = 'Club International',
  CLUB = 'Club'
}

export const SUPPORTED_TITLES = Object.values(MagazineTitle);
export const GROUNDING_URLS = [
  "https://www.webuypornusa.com/",
  "https://www.discreetretail.com/",
  "https://www.rambooks.com/",
  "https://adultstuffonly.com/Browse"
];