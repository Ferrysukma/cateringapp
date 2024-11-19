import { getPackageDetail } from "@/components/Packages/action";
import { TPackages } from "@/components/Packages/type";
import React from "react";
import ComposeHeader from "../tiers/ComposeHeader";
import { PackageCard } from "@/components/Packages";
import { TierComponentSingle } from "@/components/Tiers";
import FormPayment from "./Form";

type Request = {
  params: {
    packageSlug: string;
  };
  searchParams: {
    tier: string;
  };
};

async function PaymentPage({ params, searchParams }: Request) {
  const { data }: { data: TPackages } = await getPackageDetail(params.packageSlug);
  const currentTier = data.tiers.find((tier) => String(tier.id) === searchParams.tier);

  return (
    <>
      <ComposeHeader title="Payment Catering" />

      <section className="relative px-4 -mt-20 z-10">
        <div className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
          <PackageCard data={data} currentTier={currentTier} />

          {!!currentTier && <TierComponentSingle data={currentTier} packageSlug={params.packageSlug} tierId={searchParams.tier} />}
        </div>
      </section>

      <FormPayment data={data} tierId={searchParams.tier} />
    </>
  );
}

export default PaymentPage;
