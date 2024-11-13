import ModalCategories from "@/components/Categories/ModalCategories";
import { PreventScrolling, RouterBack, TmodalPosRegistered, TmodalRegistered } from "@/components/Modal";
import React from "react";

type Request = {
  searchParams: {
    modal: TmodalRegistered;
    "modal-pos": TmodalPosRegistered;
    [key: string]: string;
  };
};

function page({ searchParams }: Request) {
  if (searchParams.modal) {
    let modalPosition = "items-center";
    let modalWrapper = "bg-white rounded-2xl p-4 flex flex-col gap-y-5 max-w-sm relative z-20";

    if (searchParams["modal-pos"] == "bottom") {
      modalPosition = "items-end";
      modalWrapper = "relative z-20 bg-white rounded-t-2xl p-4 flex flex-col gap-y-5 max-w-sm w-full shadow-[0px_-12px_30px_0px_#0D082245]";
    }
    return (
      <>
        <div className={["fixed inset-0 z-50 bg-color4/80 flex justify-center", modalPosition].join(" ")}>
          <div className={modalWrapper}>{searchParams.modal === "filter-category" && <ModalCategories categorySlug={searchParams.categorySlug} citySlug={searchParams.citySlug} />}</div>
          <RouterBack />
        </div>
        <PreventScrolling />
      </>
    );
  }
  return null;
}

export default page;
