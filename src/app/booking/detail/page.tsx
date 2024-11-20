import React from "react";
import ComposeHeader from "./ComposeHeader";
import StruckImg from "@/assets/images/struck.svg";
import NoteImg from "@/assets/images/note.svg";
import PeopleImg from "@/assets/images/people.svg";
import { TBookingDetail } from "@/components/Packages/type";
import { detailBooking } from "@/components/Packages/action";
import Image from "next/image";
import { TierComponentSingle } from "@/components/Tiers";
import FormDetailBooking from "./Form";

type Request = {
  searchParams: {
    phone: string;
    "trx-id": string;
  };
};

async function BookingDetailPage({ searchParams }: Request) {
  const { data }: { data: TBookingDetail } = await detailBooking(searchParams.phone, searchParams["trx-id"]);
  return (
    <>
      <ComposeHeader title="My Order Details" />

      <section className="relative px-4 -mt-20 z-10">
        <div className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
          {data.is_paid === 0 ? (
            <span className="bg-color5 flex gap-x-3 p-3 rounded-2xl items-center">
              <span className="">
                <StruckImg />
              </span>
              <span className="flex flex-col">
                <span className="text-sm">Status Pembayaran</span>
                <span className="font-semibold">Terpending</span>
              </span>
            </span>
          ) : (
            <span className="bg-color3 text-white flex gap-x-3 p-3 rounded-2xl items-center">
              <span className="">
                <StruckImg />
              </span>
              <span className="flex flex-col">
                <span className="text-sm">Status Pembayaran</span>
                <span className="font-semibold">Sukses Terbayar & Siap Antar</span>
              </span>
            </span>
          )}
          <div className="flex gap-x-3">
            <figure className="w-[100px] h-[120px] rounded-2xl overflow-hidden relative">
              <Image
                fill
                className="w-full h-full object-cover object-center"
                src={`${process.env.NEXT_PUBLIC_HOST_API}/${data.cateringPackage.thumbnail}`}
                alt={data.cateringPackage.name}
                sizes="(max-width: 768px)"
              />
            </figure>
            <span className="flex flex-col gap-y-3 pt-4">
              <span className="font-semibold">{data.cateringPackage.name}</span>
              <span className="flex gap-x-1">
                <span className="text-color2">
                  <NoteImg />
                </span>
                <span className="text-gray2">{data.cateringPackage.category.name}</span>
              </span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <PeopleImg />
                </span>
                <span className="text-gray2">{data.cateringTier.quantity} orang</span>
              </span>
            </span>
          </div>

          {<TierComponentSingle data={data.cateringTier} packageSlug={data.cateringPackage.slug} tierId={data.cateringTier.id} />}
        </div>
      </section>

      <FormDetailBooking data={data} />
    </>
  );
}

export default BookingDetailPage;
