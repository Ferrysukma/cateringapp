"use client";
import React, { useEffect } from "react";
import ArrowDownImg from "@/assets/images/arrow-down.svg";
import DateImg from "@/assets/images/date.svg";
import PackageImg from "@/assets/images/package.svg";
import TimeImg from "@/assets/images/time.svg";
import PeopleImg from "@/assets/images/people.svg";
import DeliveryImg from "@/assets/images/delivery.svg";
import DiscountImg from "@/assets/images/discount.svg";
import LocationImg from "@/assets/images/location.svg";
import MapImg from "@/assets/images/map.svg";
import BuildingImg from "@/assets/images/building.svg";
import NoteImg from "@/assets/images/note.svg";
import { TPackages } from "@/components/Packages/type";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useFormState } from "react-dom";
import { submitShippment } from "@/components/Packages/action";
import { format } from "date-fns";
import "@/libs/thousands";

type Props = {
  data: TPackages;
  tierId: string;
};

const initialState: {
  message: string;
  field: string;
  data?: any;
} = {
  message: "",
  field: "",
};

function FormShipping({ data, tierId }: Props) {
  const router = useRouter();
  const [checkout, checkoutSet] = useLocalStorage<{ [key: string]: any }>("checkout", {});
  const currentTier = data.tiers.find((tier) => String(tier.id) === tierId);
  const tax = (currentTier?.price || 0) * 0.11;
  const grandTotal = (currentTier?.price || 0) + tax;
  const [state, formAction] = useFormState(submitShippment, initialState);

  useEffect(() => {
    if (!!state.field && state.field !== "") {
      const element = document.getElementById(state.field)!;
      element.focus();
    } else if (state.data) {
      checkoutSet((prev) => ({ ...prev, [state.data.slug]: { ...prev[state.data.slug], ...state.data } }));
      router.push(`/package/${data.slug}/payment?tier=${tierId}`);
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="slug" defaultValue={data.slug} />
        <div className="flex flex-col gap-y-7 px-4">
          <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
            <input type="checkbox" name="accordion" id="shipping-address" className="peer hidden" defaultChecked />
            <label htmlFor="shipping-address" className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]">
              <h6 className="text-xl font-bold">Shipping Address</h6>
              <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
                <ArrowDownImg />
              </span>
            </label>
            <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
              <div className="flex relative">
                <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                  <DateImg />
                </span>
                <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                  <span className="text-sm text-gray2">Started At</span>
                  <span className="font-semibold">{checkout[data.slug]?.started_at ? format(checkout[data.slug].started_at, "dd LLLL yyyy") : ""}</span>
                </div>
              </div>

              <div className="flex relative">
                <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                  <TimeImg />
                </span>
                <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                  <span className="text-sm text-gray2">Time</span>
                  <span className="font-semibold">Lunch Time</span>
                </div>
              </div>

              <div className="flex relative">
                <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                  <LocationImg />
                </span>
                <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                  <span className="text-sm text-gray2">City</span>
                  <span className="font-semibold">{data.city.name}</span>
                </div>
              </div>

              <div className="flex relative">
                <span className="absolute left-4 top-5 aspect-square flex items-center justify-center text-color2">
                  <BuildingImg />
                </span>
                <textarea
                  className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                  name="address"
                  id="address"
                  placeholder="Address"
                  defaultValue={checkout[data.slug]?.address || ""}
                ></textarea>
                <label
                  htmlFor="address"
                  className="absolute pointer-events-none text-gray2 flex items-center ml-12 peer-placeholder-shown:top-5 top-3 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                >
                  Address
                </label>
              </div>

              <div className="flex relative">
                <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                  <MapImg />
                </span>
                <input
                  type="text"
                  className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                  name="post_code"
                  id="post_code"
                  placeholder="Post code"
                  defaultValue={checkout[data.slug]?.post_code || ""}
                />
                <label
                  htmlFor="post_code"
                  className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                >
                  Post code
                </label>
              </div>

              <div className="flex relative">
                <span className="absolute left-4 top-5 aspect-square flex items-center justify-center text-color2">
                  <NoteImg />
                </span>
                <textarea
                  className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                  name="notes"
                  id="notes"
                  placeholder="Notes"
                  defaultValue={checkout[data.slug]?.notes || ""}
                ></textarea>
                <label
                  htmlFor="notes"
                  className="absolute pointer-events-none text-gray2 flex items-center ml-12 peer-placeholder-shown:top-5 top-3 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                >
                  Notes
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
            <input type="checkbox" name="accordion" id="payment-details" className="peer hidden" checked />
            <label htmlFor="payment-details" className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]">
              <h6 className="text-xl font-bold">Payment Details</h6>
              <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
                <ArrowDownImg />
              </span>
            </label>
            <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
              <div className="flex flex-col gap-y-4">
                <div className="flex relative">
                  <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                    <PackageImg />
                  </span>
                  <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                    <span className="text-sm text-gray2">Paket Catering</span>
                    <span className="font-semibold">Rp {(currentTier?.price || 0).thousands()}</span>
                  </div>
                </div>

                <div className="flex relative">
                  <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                    <TimeImg />
                  </span>
                  <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                    <span className="text-sm text-gray2">Duration</span>
                    <span className="font-semibold">
                      {currentTier?.duration || 0} Day{(currentTier?.duration || 0) > 1 && `s`} Regularly
                    </span>
                  </div>
                </div>

                <div className="flex relative">
                  <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                    <PeopleImg />
                  </span>
                  <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                    <span className="text-sm text-gray2">Quantity</span>
                    <span className="font-semibold">{currentTier?.quantity} People</span>
                  </div>
                </div>

                <div className="flex relative">
                  <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                    <DeliveryImg />
                  </span>
                  <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                    <span className="text-sm text-gray2">Delivery</span>
                    <span className="font-semibold">Rp 0 (Free)</span>
                  </div>
                </div>

                <div className="flex relative">
                  <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                    <DiscountImg />
                  </span>
                  <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                    <span className="text-sm text-gray2">PPN 11%</span>
                    <span className="font-semibold">Rp {tax.thousands()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-4 z-50 mb-8">
            <div className="rounded-full flex justify-between gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 pl-6">
              <span className="flex flex-col">
                <span className="text-gray2 text-sm">Grand Total</span>
                <span className="font-semibold text-xl">Rp {grandTotal.thousands()}</span>
              </span>
              <button type="submit" className="bg-color1 rounded-full flex items-center justify-center text-white px-5">
                Continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormShipping;
