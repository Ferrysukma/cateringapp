import React from "react";
import ComposeHeader from "./ComposeHeader";
import { TPackages } from "@/components/Packages/type";
import { getPackageDetail } from "@/components/Packages/action";
import Image from "next/image";
import NoteImg from "@/assets/images/note.svg";
import PeopleImg from "@/assets/images/people.svg";
import TiersComponent from "@/components/Tiers";

type Request = {
  params: {
    packageSlug: string;
  };
};

async function TiersPage({ params }: Request) {
  const { data }: { data: TPackages } = await getPackageDetail(params.packageSlug);
  const currentTier = data.tiers.length > 0 ? data.tiers.reduce((min, current) => (current.price < min.price ? current : min)) : null;
  return (
    <>
      <ComposeHeader title="Tier Package" />

      <section className="relative px-4 -mt-20 z-10">
        <div className="flex gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl items-center">
          <figure className="w-[100px] h-[120px] flex-none rounded-2xl overflow-hidden relative">
            <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${data.thumbnail}`} alt={data.name} sizes="(max-width: 768px)" />
          </figure>
          <span className="flex flex-col gap-y-3">
            <span className="font-semibold">Asian Spicy Guandong</span>
            <span className="flex gap-x-1">
              <span className="text-color2">
                <NoteImg />
              </span>
              <span className="text-gray2">Healthy</span>
            </span>

            <span className="flex gap-x-1">
              <span className="text-color2">
                <PeopleImg />
              </span>
              <span className="text-gray2">{currentTier?.quantity || 0} orang</span>
            </span>
          </span>
        </div>
      </section>

      <section className="relative z-10 pb-10">
        <h2 className="font-semibold px-4 mb-3">Choose Your Package</h2>
        <div className="flex flex-col gap-y-4 px-4">
          <TiersComponent data={data.tiers} packageSlug={params.packageSlug} />
        </div>
      </section>
    </>
  );
}

export default TiersPage;
