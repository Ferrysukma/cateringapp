export type TCategory = {
  id: number;
  name: string;
  slug: string;
  photo: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  catering_packages: [];
};