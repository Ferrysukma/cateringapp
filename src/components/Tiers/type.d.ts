export type TTier = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  duration: number;
  photo: string;
  message: null | string;
  benefits: TBenefit[];
};

export type TBenefit = {
  id: number;
  name: string;
  catering_tier_id: number;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
};
