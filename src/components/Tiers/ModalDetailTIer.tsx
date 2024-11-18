import Image from "next/image";
import React from "react";
import VerifiedImg from "@/assets/images/verified.svg";
import { TPackages } from "../Packages/type";
import { getPackageDetail } from "../Packages/action";

type Props = {
  packageSlug: string;
  tierId: string;
};

async function ModalDetailTIer({ packageSlug, tierId }: Props) {
  const { data }: { data: TPackages } = await getPackageDetail(packageSlug);
  const currentTier = data.tiers.find((tier) => String(tier.id) === tierId);
  return (
    <>
      {!!currentTier && (
        <>
          <div className="flex gap-x-3">
            <figure className="w-[100px] h-[80px] rounded-2xl overflow-hidden relative">
              <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${currentTier.photo}`} alt={currentTier.name} sizes="(max-width: 768px)" />
            </figure>
            <span className="flex flex-col justify-center gap-y-1">
              <span className="font-semibold">{currentTier.name}</span>
              <span className="text-gray2">{currentTier.message}</span>
            </span>
          </div>
          <hr />

          <ul className="flex flex-col gap-y-4">
            {currentTier.benefits.map((item) => (
              <li className="flex gap-x-2" key={item.id}>
                <span className="text-color3">
                  <VerifiedImg />
                </span>
                <span className="font-semibold">{item.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default ModalDetailTIer;
