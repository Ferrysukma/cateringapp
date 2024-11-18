import React from "react";
import { TBenefit, TTier } from "./type";
import Image from "next/image";
import VerifiedImg from "@/assets/images/verified.svg";
import TimeImg from "@/assets/images/time.svg";
import PeopleImg from "@/assets/images/people.svg";
import Link from "next/link";

function TiersComponent({ data, packageSlug }: { data: TTier[]; packageSlug: string }) {
  return (
    <>
      {data.map((item) => (
        <div className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border" key={item.id}>
          <span className="flex gap-x-2 items-center">
            <figure className="w-[100px] h-[80px] rounded-2xl overflow-hidden relative">
              <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${item.photo}`} alt={item.name} sizes="(max-width: 768px)" />
            </figure>
            <span className="flex flex-col">
              <h2 className="font-semibold text-lg">Family Ceria</h2>
              <span className="text-gray2 text-sm">Untuk anda baru memulai</span>
            </span>
          </span>

          <hr />

          <ul className="flex flex-col gap-y-4">
            {item.benefits.map((list: TBenefit) => (
              <li className="flex gap-x-2" key={list.id}>
                <span className="text-color3">
                  <VerifiedImg />
                </span>
                <span className="font-semibold">{list.name}</span>
              </li>
            ))}
          </ul>

          <hr />

          <span className="flex flex-col gap-y-2">
            <span className="font-semibold text-xl">Rp {item.price.thousands()}</span>
            <span className="flex gap-x-3">
              <span className="flex gap-x-1">
                <span className="text-color2">
                  <TimeImg />
                </span>
                <span className="text-gray2">{item.duration} days</span>
              </span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <PeopleImg />
                </span>
                <span className="text-gray2">{item.quantity} orang</span>
              </span>
            </span>
          </span>

          <hr />

          <Link
            href={`/package/${packageSlug}/informations?tier=${item.id}`}
            className="flex py-3 border border-gray1 rounded-full font-semibold justify-center hover:bg-color1 hover:text-white hover:border-transparent"
          >
            Choose Package
          </Link>
        </div>
      ))}
    </>
  );
}

export default TiersComponent;
