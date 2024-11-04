export type TTestimonials = {
  id: number;
  name: string;
  photo: string;
  message: string;
  cateringPackage: {
    id: number;
    name: string;
    slug: string;
    is_popular: 1 | 0;
    thumbnail: string;
    about: string;
  };
};
