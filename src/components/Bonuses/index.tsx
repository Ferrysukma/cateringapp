import React from "react";
import { TBonus } from "./type";
import Slider from "../Slider";
import Image from "next/image";
import Link from "next/link";

function Bonusses({ data }: { data: TBonus[] }) {
  return (
    <>
      <Slider spaceBetween={20} swiperClassName="!h-[153px]" swiperSlideClassName="!w-[190px]">
        {data.map((item) => (
          <div className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border" key={item.id}>
            <figure className="w-full aspect-video rounded-2xl overflow-hidden relative">
              <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${item.photo}`} alt={item.name} sizes="(max-width: 768px)" />
            </figure>
            <span className="font-semibold text-center text-sm">{item.name}</span>
            <Link href="/" className="absolute inset-0"></Link>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default Bonusses;
