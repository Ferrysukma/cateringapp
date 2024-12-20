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
import { TierComponentSingle } from "@/components/Tiers";
import { PackageCard } from "@/components/Packages";

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
          <PackageCard data={data} currentTier={currentTier} />

          {!!currentTier && <TierComponentSingle data={currentTier} packageSlug={params.packageSlug} tierId={searchParams.tier} />}
        </div>
      </section>

      <FormInformation data={data} tierId={searchParams.tier} />
    </>
  );
}

export default InformationsPage;
