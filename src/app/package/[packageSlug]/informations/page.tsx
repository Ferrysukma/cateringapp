import React from "react";
import ComposeHeader from "../tiers/ComposeHeader";
import NoteImg from "@/assets/images/note.svg";
import PeopleImg from "@/assets/images/people.svg";
import { TPackages } from "@/components/Packages/type";
import { getPackageDetail } from "@/components/Packages/action";
import Image from "next/image";
import { OpenModal } from "@/components/Modal";
import { TTier } from "@/components/Tiers/type";
import FormInformation from "./Form";

type Request = {
  params: {
    packageSlug: string;
  };
  searchParams: {
    tier: string;
  };
};

async function InformationsPage({ params, searchParams }: Request) {
  const { data }: { data: TPackages } = await getPackageDetail(params.packageSlug);
  const currentTier = data.tiers.find((tier) => String(tier.id) === searchParams.tier);
  return (
    <>
      <ComposeHeader title="Your Informations" />

      <section className="relative px-4 -mt-20 z-10">
        <div className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
          <div className="flex gap-x-3">
            <figure className="w-[100px] h-[120px] flex-none rounded-2xl overflow-hidden relative">
              <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${data.thumbnail}`} alt={data.name} sizes="(max-width: 768px)" />
            </figure>
            <span className="flex flex-col gap-y-3 pt-4">
              <span className="font-semibold">{data.name}</span>
              <span className="flex gap-x-1">
                <span className="text-color2">
                  <NoteImg />
                </span>
                <span className="text-gray2">{data.category.name}</span>
              </span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <PeopleImg />
                </span>
                <span className="text-gray2">{currentTier?.quantity} orang</span>
              </span>
            </span>
          </div>

          {!!currentTier && (
            <div className="">
              <h2 className="font-semibold mb-3">Tier Package</h2>
              <div className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border-2 border-dashed">
                <span className="flex gap-x-2 items-center">
                  <figure className="w-[100px] h-[80px] rounded-2xl overflow-hidden relative">
                    <Image
                      fill
                      className="w-full h-full object-cover object-center"
                      src={`${process.env.NEXT_PUBLIC_HOST_API}/${currentTier.photo}`}
                      alt={currentTier.name}
                      sizes="(max-width: 768px)"
                    />
                  </figure>
                  <h3 className="font-semibold text-lg">{currentTier.name}</h3>
                  <OpenModal modal="tier" queries={{ packageSlug: params.packageSlug, tierId: searchParams.tier }} className="bg-gray1 px-3 font-semibold text-sm py-1 flex rounded-full">
                    Details
                  </OpenModal>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <FormInformation data={data} tierId={searchParams.tier} />
    </>
  );
}

export default InformationsPage;
