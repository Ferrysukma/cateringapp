import Link from "next/link";
import React from "react";
import { getAllCategories } from "./action";
import { TCategory } from "./type";
import Image from "next/image";

type Props = {};

export function ContentCategory({ data }: { data: TCategory }) {
  return (
    <div className="flex flex-col items-center gap-y-2 relative">
      <figure className="w-16 aspect-square relative">
        <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${data.photo}`} alt={data.name} sizes="(max-width: 768px)" />
      </figure>
      <span className="">{data.name}</span>
      <Link href={`categories/${data.slug}`} className="absolute inset-0"></Link>
    </div>
  );
}

async function Categories({}: Props) {
  const { data }: { data: TCategory[] } = await getAllCategories();
  return (
    <section className="px-4">
      <h2 className="font-semibold mb-4">Browse Category</h2>
      <div className="grid grid-cols-4 gap-4">
        {data.map((categoy) => (
          <ContentCategory key={categoy.id} data={categoy} />
        ))}
      </div>
    </section>
  );
}

export default Categories;
