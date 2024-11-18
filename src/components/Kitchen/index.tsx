import React from "react";
import { TKitchen } from "./type";
import VerifiedImg from "@/assets/images/verified.svg";
import Image from "next/image";
import Link from "next/link";

function KitchenComponent({ data }: { data: TKitchen }) {
  return (
    <span className="flex justify-between items-center gap-x-3 px-4">
      <figure className="w-14 aspect-square rounded-full overflow-hidden relative">
        <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${data.photo}`} alt={data.name} sizes="(max-width: 768px)" />
      </figure>
      <span className="flex flex-col">
        <span className="flex gap-x-2">
          <h3 className="font-semibold">{data.name}</h3>
          <span className="text-color3">
            <VerifiedImg />
          </span>
        </span>
        <span className="text-sm text-gray2"> Sejak tahun {data.year} </span>
      </span>
      <span className="mx-auto"></span>
      <Link href="/" className="bg-gray1 px-3 font-semibold text-sm py-1 flex rounded-full">
        Profile
      </Link>
    </span>
  );
}

export default KitchenComponent;
