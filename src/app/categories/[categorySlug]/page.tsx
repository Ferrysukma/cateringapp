import ComposeHeader from "./ComposeHeader";
import { TCategory } from "@/components/Categories/type";
import { getDetailCategory } from "@/components/Categories/action";
import Image from "next/image";
import PeopleImg from "@/assets/images/people.svg";

import { ContentNewest, ContentPopular } from "@/components/Packages";
import { OpenModal } from "@/components/Modal";
import { getPackageFiltered } from "@/components/Packages/action";
import { TPackages } from "@/components/Packages/type";
import { Metadata, ResolvingMetadata } from "next";

type Request = {
  params: {
    categorySlug: string;
  };
  searchParams: {
    citySlug: string;
  };
};

export async function generateMetadata({ params }: Request, parent: ResolvingMetadata): Promise<Metadata> {
  const categories: { data: TCategory } = await getDetailCategory(params.categorySlug);
  return {
    title: `Category ${categories.data.name}`,
  };
}

async function PageCategoryDetail({ params, searchParams }: Request) {
  const categories: { data: TCategory } = await getDetailCategory(params.categorySlug);
  let catering_packages = categories.data.catering_packages;

  if (searchParams.citySlug && searchParams.citySlug != "") {
    const { data }: { data: TPackages[] } = await getPackageFiltered(params.categorySlug, searchParams.citySlug);
    catering_packages = data;
  }

  return (
    <>
      <ComposeHeader title={categories.data.name} />

      <section className="relative px-4 -mt-20 z-10">
        <div className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
          <div className="flex gap-x-3 items-center">
            <figure className="relative w-[100px] h-[120px] rounded-2xl overflow-hidden">
              <Image
                fill
                className="w-full h-full object-cover object-center"
                src={`${process.env.NEXT_PUBLIC_HOST_API}/${categories.data.photo}`}
                alt={categories.data.name}
                sizes="(max-width: 768px)"
              />
            </figure>
            <span className="flex flex-col gap-y-3">
              <span className="font-semibold">{categories.data.name}</span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <PeopleImg />
                </span>
                <span className="text-gray2">
                  {categories.data.catering_packages_count.thousands()} {`Package${categories.data.catering_packages_count > 1 ? "s" : ""}`}
                </span>
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Most People Love It</h2>
        <ContentPopular data={catering_packages} />
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Fresh From Kitchen</h2>
        <ContentNewest data={catering_packages} />
      </section>

      <div className="sticky bottom-4 mt-36 px-4 z-50 flex justify-center">
        <OpenModal queries={{ categorySlug: params.categorySlug }} modal="filter-category" modalPosition="bottom" className="bg-color1 text-white px-5 py-3 rounded-full font-semibold text-center">
          See Filter
        </OpenModal>
      </div>
    </>
  );
}

export default PageCategoryDetail;
