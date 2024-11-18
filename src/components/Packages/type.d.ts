import { TCategory } from "@/Categories/type";
import { TCity } from "@/Cities/type";
import { TKitchen } from "../Kitchen/type";
import { TTier } from "../Tiers/type";
import { TPhoto } from "../Photos/type";
import { TBonus } from "../Bonuses/type";
import { TTestimonials } from "../Testimonials/type";

export type TPackages = {
  id: number;
  name: string;
  slug: string;
  is_popular: 1 | 0;
  thumbnail: string;
  about: string;
  city: TCity;
  category: TCategory;
  kitchen: TKitchen;
  tiers: TTier[];
  photos: TPhoto[];
  bonuses: TBonus[];
  testimonials: TTestimonials[];
};

export type TShow = "popular" | "newest";
