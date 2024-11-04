import React from "react";
import { TTestimonials } from "./type";
import { getAllTestimonials } from "./action";
import Slider from "../Slider";
import StarImg from "@/assets/images/start.svg";
import Image from "next/image";

type Props = {};

export function ContentTestimonial({ data }: { data: TTestimonials[] }) {
  return (
    <Slider spaceBetween={20} swiperClassName="!h-[156px] !px-4" swiperSlideClassName="!w-[280px]">
      {data.map((item) => (
        <div className="h-full rounded-3xl overflow-hidden relative border p-3 flex flex-col gap-y-3" key={item.id}>
          <span className="text-color1 flex gap-x-1">
            <StarImg />
            <StarImg />
            <StarImg />
            <StarImg />
            <StarImg />
          </span>

          <p className="italic text-sm font-semibold leading-6">{item.message}</p>

          <div className="flex gap-x-3 items-center">
            <figure className="w-9 flex-none aspect-square relative rounded-full overflow-hidden">
              <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${item.photo}`} alt={item.name} sizes="(max-width: 768px)" />
            </figure>
            <span className="font-semibold">{item.name}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
}

async function Testimonials({}: Props) {
  const { data }: { data: TTestimonials[] } = await getAllTestimonials();
  return <ContentTestimonial data={data} />;
}

export default Testimonials;
