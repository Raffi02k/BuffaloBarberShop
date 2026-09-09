export interface Service {
  slug: string; title: string; category: string; price: number; from: boolean;
  minutes?: number; image: string; intro: string; details: string[]; note?: string;
}
export interface Barber {
  slug: string; name: string; role: string; initials: string; image?: string;
  position?: string; intro: string; about: string; tags: string[];
  instagram?: string; galleryIds: string[]; verified: boolean;
}
export interface GalleryItem {
  id: string; src: string; alt: string; title: string; category: string;
  kind: 'provided' | 'reference'; position?: string;
}
export interface Review {
  id: string; name: string; text: string; source: string; url: string;
  excerpt?: boolean; demo?: boolean; rating?: number; summary?: boolean;
}
