import React from "react";
import { TPackages, TShow } from "./type";
import { getAllPackages } from "./action";
import Slider from "../Slider";
import CategoryImg from "@/assets/images/category.svg";
import PeopleImg from "@/assets/images/people.svg";
import LocationImg from "@/assets/images/location.svg";
import Link from "next/link";
import Image from "next/image";

type Props = {
  show: TShow;
};

export function ContentPopular({ data }: { data: TPackages[] }) {
  if (data.length <= 0) return "No Data";

  return (
    <Slider spaceBetween={20} swiperClassName="!h-[260px] !px-4" swiperSlideClassName="!w-[240px]">
      {data.map((item) => (
        <div key={item.id} className="h-full rounded-3xl overflow-hidden relative border">
          <figure className="w-full h-full absolute">
            <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${item.thumbnail}`} alt={item.name} sizes="(max-width: 768px)" />
          </figure>

          <div className="absolute left-2 bottom-2 right-2 flex flex-col bg-white rounded-2xl p-3">
            <span className="font-semibold">{item.name}</span>
            <span className="flex gap-x-3">
              <span className="flex gap-x-1">
                <span className="text-color2">
                  <CategoryImg />
                </span>
                <span className="text-gray2">{item.category.name}</span>
              </span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <PeopleImg />
                </span>
                <span className="text-gray2">{item.tiers.length}</span>
              </span>
            </span>
          </div>
          <Link href={`package/${item.slug}`} className="absolute inset-0"></Link>
        </div>
      ))}
    </Slider>
  );
}

export function ContentNewest({ data }: { data: TPackages[] }) {
  if (data.length <= 0) return "No Data";

  return (
    <div className="flex flex-col gap-y-4 px-4">
      {data.map((item) => (
        <div className="flex gap-x-3" key={item.id}>
          <figure className="w-[120px] h-[160px] flex-none rounded-2xl overflow-hidden relative">
            <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${item.thumbnail}`} alt={item.name} sizes="(max-width: 768px)" />
          </figure>
          <span className="flex flex-col gap-y-3 pt-4">
            <span className="font-semibold">{item.name}</span>
            <span className="flex gap-x-1">
              <span className="text-color2">
                <CategoryImg />
              </span>
              <span className="text-gray2">{item.category.name}</span>
            </span>

            <span className="flex gap-x-1">
              <span className="text-color2">
                <PeopleImg />
              </span>
              <span className="text-gray2">{item.tiers.length}</span>
            </span>

            <span className="flex gap-x-1">
              <span className="text-color2">
                <LocationImg />
              </span>
              <span className="text-gray2">{item.city.name}</span>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

async function Packages({ show }: Props) {
  const { data }: { data: TPackages[] } = await getAllPackages();
  if (show == "popular") {
    return <ContentPopular data={data} />;
  }

  return <ContentNewest data={data} />;
}

export default Packages;
