"use client";

import React from "react";
import { TCategory } from "./type";
import { TCity } from "../Cities/type";
import { useFormState } from "react-dom";
import { navigateFilterCategories } from "./action";

type Props = {
  categorySlug: string;
  citySlug?: string;
  categories: TCategory[];
  cities: TCity[];
};

function FormFilterCategories({ categorySlug, citySlug, categories, cities }: Props) {
  const [, formAction] = useFormState(navigateFilterCategories, { message: "", field: "" });
  console.log("citySlug", citySlug);
  return (
    <form action={formAction}>
      <h6 className="text-xl font-semibold">Set Filter (2)</h6>
      <div className="flex flex-col gap-y-4 mt-3">
        <h6 className="text-sm font-semibold">Category</h6>
        {categories.map((item) => (
          <label htmlFor={`category${item.id}`} className="flex gap-x-2 cursor-pointer">
            <input type="radio" name="category" id={`category${item.id}`} className="hidden peer" defaultValue={item.slug} defaultChecked={item.slug === categorySlug} />
            <span className="radio p-1 rounded-full border border-color2 w-6 aspect-square peer-checked:[&>span]:opacity-100">
              <span className="aspect-square h-full block rounded-full opacity-0 bg-color2 transition-all duration-300"></span>
            </span>
            <span className="">{item.name}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-col gap-y-3 mt-4">
        <h6 className="text-sm font-semibold">City</h6>
        {cities.map((item) => (
          <label htmlFor={`city${item.id}`} className="flex gap-x-2 cursor-pointer">
            <input type="radio" name="city" id={`city${item.id}`} className="hidden peer" defaultChecked={item.slug === citySlug} defaultValue={item.slug} />
            <span className="radio p-1 rounded-full border border-color2 w-6 aspect-square peer-checked:[&>span]:opacity-100">
              <span className="aspect-square h-full block rounded-full opacity-0 bg-color2 transition-all duration-300"></span>
            </span>
            <span className="">{item.name}</span>
          </label>
        ))}
      </div>
      <button type="submit" className="bg-color1 text-white px-5 py-3 rounded-full font-semibold text-center">
        View Results
      </button>
    </form>
  );
}

export default FormFilterCategories;
