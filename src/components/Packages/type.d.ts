import { TCategory } from "@/Categories/type";
import { TCity } from "@/Cities/type";

export type TPackages = {
  id: number;
  name: string;
  slug: string;
  is_popular: 1 | 0;
  thumbnail: string;
  about: string;
  city: TCity;
  category: TCategory;
  kitchen: {};
  tiers: [];
};

export type TShow = "popular" | "newest";
