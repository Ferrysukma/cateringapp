import { getPackageDetail } from "@/components/Packages/action";
import { TPackages } from "@/components/Packages/type";
import { Metadata, ResolvingMetadata } from "next";
import ComposeHeader from "./ComposeHeader";
import Slider from "@/components/Slider";
import Image from "next/image";
import NoteImg from "@/assets/images/note.svg";
import PeopleImg from "@/assets/images/people.svg";
import HalfStarImg from "@/assets/images/half-star.svg";
import LocationImg from "@/assets/images/location.svg";
import DeliveryImg from "@/assets/images/delivery.svg";
import Link from "next/link";
import Bonusses from "@/components/Bonuses";
import { ContentTestimonial } from "@/components/Testimonials";
import KitchenComponent from "@/components/Kitchen";

type Request = {
  params: {
    packageSlug: string;
  };
};

export async function generateMetadata({ params }: Request, parent: ResolvingMetadata): Promise<Metadata> {
  const packages: { data: TPackages } = await getPackageDetail(params.packageSlug);
  return {
    title: `${packages.data.name}`,
    description: `${packages.data.about}`,
  };
}

async function PackageDetailPage({ params }: Request) {
  const { data }: { data: TPackages } = await getPackageDetail(params.packageSlug);
  const currentTier = data.tiers.length > 0 ? data.tiers.reduce((min, current) => (current.price < min.price ? current : min)) : null;
  return (
    <>
      <ComposeHeader />

      <section className="relative">
        <Slider spaceBetween={20} swiperClassName="!h-[550px]" swiperSlideClassName="!w-full" hasPagination>
          {data.photos.map((item) => (
            <figure className="w-full h-full absolute" key={item.id}>
              <Image fill className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_HOST_API}/${item.photo}`} alt={item.photo} sizes="(max-width: 768px)" />
            </figure>
          ))}
        </Slider>

        <div className="flex left-0 right-0 gap-x-4 mx-4 bg-white shadow-[0px_12px_30px_0px_#07041517] p-4 -translate-y-1/2 rounded-3xl justify-between absolute top-full z-20">
          <span className="flex flex-col gap-y-3">
            <h1 className="text-xl font-bold">{data.name}</h1>
            <span className="flex gap-x-3">
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
                <span className="text-gray2">{data.testimonials.length}</span>
              </span>
            </span>
          </span>
          <span className="bg-color1 flex flex-col items-center justify-center px-2 gap-y-2 rounded-2xl text-white">
            <HalfStarImg />
            <span className="">4.5/5</span>
          </span>
        </div>
      </section>

      <section className="relative z-10 mt-16">
        <h2 className="font-semibold px-4 mb-3">About Package</h2>
        <p className="px-4">{data.about}</p>
      </section>

      <section className="relative z-10">
        <h2 className="font-semibold px-4 mb-3">All Bonuses For You</h2>
        <Bonusses data={data.bonuses} />
      </section>

      <section className="relative z-10">
        <h2 className="font-semibold px-4 mb-3">Catering Details</h2>
        <div className="grid grid-cols-2 gap-3 px-4">
          <span className="flex gap-x-3">
            <span className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex">
              <LocationImg />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">City</span>
              <span className="font-semibold">{data.city.name}</span>
            </span>
          </span>

          <span className="flex gap-x-3">
            <span className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex">
              <PeopleImg />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">Portion</span>
              <span className="font-semibold">{currentTier?.quantity || 0} People</span>
            </span>
          </span>

          <span className="flex gap-x-3">
            <span className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex">
              <NoteImg />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">Category</span>
              <span className="font-semibold">{data.category.name}</span>
            </span>
          </span>

          <span className="flex gap-x-3">
            <span className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex">
              <DeliveryImg />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">Delivery</span>
              <span className="font-semibold">Free 100%</span>
            </span>
          </span>
        </div>
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-3 px-4">Most People Love It</h2>
        <ContentTestimonial data={data.testimonials} />
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-3 px-4">Kitchen</h2>
        <KitchenComponent data={data.kitchen} />
      </section>

      <div className="sticky bottom-4 px-4 z-50 mt-8">
        <div className="rounded-full flex justify-between gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 pl-6">
          <span className="flex flex-col">
            <span className="font-semibold text-xl">Rp {(currentTier?.price || 0).thousands()}</span>
            <span className="text-gray2 text-sm">
              {currentTier?.duration || 0} days, {currentTier?.quantity || 0} people
            </span>
          </span>
          <Link href={`/package/${params.packageSlug}/tiers`} className="bg-color1 rounded-full flex items-center justify-center text-white px-5">
            Booking Now
          </Link>
        </div>
      </div>
    </>
  );
}

export default PackageDetailPage;
