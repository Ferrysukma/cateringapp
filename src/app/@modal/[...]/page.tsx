import { TmodalPosRegistered, TmodalRegistered } from "@/components/Modal";
import React from "react";

type Request = {
  searchParam: {
    modal: TmodalRegistered;
    "modal-pos": TmodalPosRegistered;
    [key: string]: string;
  };
};

function page({ searchParam }: Request) {
  if (searchParam.modal) {
    let modalPosition = "items-center";
    let modalWrapper = "bg-white rounded-2xl p-4 flex flex-col gap-y-5 max-w-sm relative z-20";

    if (searchParam["modal-pos"] == "bottom") {
      modalPosition = "items-end";
      modalWrapper = "bg-white rounded-t-2xl p-4 flex flex-col gap-y-5 max-w-sm w-full shadow-[0px_-12px_30px_0px_#0D082245]";
    }
    return (
      <>
        <div className={["hidden fixed inset-0 z-50 bg-color4/80 items-center justify-center", modalPosition].join(" ")}>
          <div className={modalWrapper}>{/* Render all content here */}</div>
          <RouterBack></RouterBack>
        </div>
        <PreventScrolling></PreventScrolling>
      </>
    );
  }
  return null;
}

export default page;
