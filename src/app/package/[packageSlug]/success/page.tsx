import { detailBooking } from "@/components/Packages/action";
import { TBookingDetail } from "@/components/Packages/type";
import Image from "next/image";
import StruckImg from "@/assets/images/struck.svg";
import Link from "next/link";

type Request = {
  searchParams: {
    tier: string;
    phone: string;
    "trx-id": string;
  };
};

async function SuccessPage({ searchParams }: Request) {
  const { data }: { data: TBookingDetail } = await detailBooking(searchParams.phone, searchParams["trx-id"]);
  if (!data) {
    return <h1>Data Not Found</h1>;
  }

  return (
    <>
      <section className="relative">
        <figure className="w-full h-[450px] relative">
          <Image
            fill
            className="w-full h-full object-cover object-center"
            src={`${process.env.NEXT_PUBLIC_HOST_API}/${data.cateringPackage.thumbnail}`}
            alt={data.cateringPackage.name}
            sizes="(max-width: 768px)"
          />
        </figure>

        <div className="flex left-0 right-0 gap-x-4 mx-4 bg-white shadow-[0px_12px_30px_0px_#07041517] p-4 -translate-y-1/2 rounded-3xl justify-between absolute top-full z-20">
          <span className="flex flex-col gap-y-2">
            <h1 className="flex gap-x-1">
              <span className="text-color2">
                <StruckImg />
              </span>

              <span className="text-gray2 text-sm"> Booking Transaction ID </span>
            </h1>
            <span className="font-bold text-xl">{data.booking_trx_id}</span>
          </span>
        </div>
      </section>

      <section className="relative mt-16 flex flex-col items-center gap-y-4">
        <h2 className="font-bold text-2xl text-center">Booking Finished</h2>
        <p className="px-4 text-center text-gray2">Gunakan kode booking di atas untuk memeriksa status pemesanan</p>

        <div className="flex flex-col gap-y-4">
          <Link href="/booking" className="bg-color1 text-white rounded-full inline-flex items-center justify-center px-5 py-3">
            View My Booking
          </Link>

          <Link href="/" className="bg-white border border-gray2 rounded-full inline-flex items-center justify-center px-5 py-3">
            Book Other Package
          </Link>
        </div>
      </section>
    </>
  );
}

export default SuccessPage;
