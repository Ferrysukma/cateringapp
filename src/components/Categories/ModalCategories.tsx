import React from "react";
import { TCategory } from "./type";
import { getAllCategories } from "./action";
import { TCity } from "../Cities/type";
import { getAllCities } from "../Cities/action";
import FormFilterCategories from "./FormFilter";

type Props = { categorySlug: string; citySlug?: string };

async function ModalCategories({ categorySlug, citySlug }: Props) {
  const { data: categories }: { data: TCategory[] } = await getAllCategories();
  const { data: cities }: { data: TCity[] } = await getAllCities();

  return (
    <>
      <FormFilterCategories categories={categories} cities={cities} categorySlug={categorySlug} citySlug={citySlug} />
    </>
  );
}

export default ModalCategories;
