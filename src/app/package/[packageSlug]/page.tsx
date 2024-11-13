import { getPackageDetail } from "@/components/Packages/action";
import { TPackages } from "@/components/Packages/type";
import { Metadata, ResolvingMetadata } from "next";
import ComposeHeader from "./ComposeHeader";

type Request = {
  params: {
    packageSlug: string;
  };
};

export async function generateMetadata({ params }: Request, parent: ResolvingMetadata): Promise<Metadata> {
  const packages: { data: TPackages } = await getPackageDetail(params.packageSlug);
  return {
    title: `Category ${packages.data.name}`,
  };
}

function PackageDetailPage({}: Request) {
  return (
    <>
      <ComposeHeader />
    </>
  );
}

export default PackageDetailPage;
