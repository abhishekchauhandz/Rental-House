import { ReactNode } from "react";

// src/types.ts
export interface Property {
  item: ReactNode;
  title: string;
  price: number;
  image: string;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string;
  location: string;
  area: number;
  description: string;
}
