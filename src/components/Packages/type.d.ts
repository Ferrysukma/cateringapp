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

export type TBookingDetail = {
  id: number;
  name: string;
  email: string;
  phone: string;
  post_code: string;
  city: string;
  address: string;
  notes: string;
  started_at: string;
  ended_at: string;
  booking_trx_id: string;
  price: number;
  total_tax_amount: number;
  total_amount: number;
  delivery_time: string;
  quantity: number;
  duration: number;
  is_paid: 1 | 0;
  proof: string;
  cateringPackage: TPackages;
  cateringTier: TTier;
};
