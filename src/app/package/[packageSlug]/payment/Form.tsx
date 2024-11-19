"use client";
import React, { useEffect } from "react";
import ArrowDownImg from "@/assets/images/arrow-down.svg";
import UserImg from "@/assets/images/user.svg";
import EnvelopImg from "@/assets/images/envelop.svg";
import PhoneImg from "@/assets/images/phone.svg";
import DateImg from "@/assets/images/date.svg";
import PackageImg from "@/assets/images/package.svg";
import TimeImg from "@/assets/images/time.svg";
import PeopleImg from "@/assets/images/people.svg";
import DeliveryImg from "@/assets/images/delivery.svg";
import DiscountImg from "@/assets/images/discount.svg";
import BCAImg from "@/assets/images/bca.svg";
import MandiriImg from "@/assets/images/mandiri.svg";
import LocationImg from "@/assets/images/location.svg";
import MapImg from "@/assets/images/map.svg";
import BuildingImg from "@/assets/images/building.svg";
import NoteImg from "@/assets/images/note.svg";
import VerifiedImg from "@/assets/images/verified.svg";
import FileImg from "@/assets/images/file.svg";
import { TPackages } from "@/components/Packages/type";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useFormState } from "react-dom";
import { submitPayment } from "@/components/Packages/action";
import "@/libs/thousands";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "react-toastify";

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

function FormPayment({ data, tierId }: Props) {
  const router = useRouter();
  const [checkout, checkoutSet] = useLocalStorage<{ [key: string]: any }>("checkout", {});
  const currentTier = data.tiers.find((tier) => String(tier.id) === tierId);
  const tax = (currentTier?.price || 0) * 0.11;
  const grandTotal = (currentTier?.price || 0) + tax;
  const [state, formAction] = useFormState(submitPayment, initialState);

  useEffect(() => {
    if (!!state.field && state.field !== "") {
      if (state.field === "toaster") {
        toast.error(state.message);
      } else {
        const element = document.getElementById(state.field)!;
        element.focus();
        element.click();
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else if (state.data) {
      checkoutSet((prev) => {
        const before = { ...prev };
        delete before[state.data.slug];
        return before;
      });
      router.push(`/package/${data.slug}/success?tier=${tierId}&phone=${state.data.phone}&trx-id=${state.data.booking_trx_id}`);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="slug" defaultValue={data.slug} />
      <input type="hidden" name="catering_package_id" defaultValue={data.id} />
      <input type="hidden" name="catering_tier_id" defaultValue={tierId} />
      <div className="flex flex-col gap-y-7 px-4">
        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input type="checkbox" name="accordion" id="customer-information" className="peer hidden" />
          <label htmlFor="customer-information" className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]">
            <h6 className="text-xl font-bold">Customer Information</h6>
            <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
              <ArrowDownImg />
            </span>
          </label>
          <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
            <div className="flex flex-col gap-y-4">
              <div className="flex relative">
                <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                  <UserImg />
                </span>
                <input
                  type="text"
                  className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  defaultValue={checkout[data.slug]?.name || ""}
                />
                <label
                  htmlFor="name"
                  className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                >
                  Full Name
                </label>
              </div>

              <div className="flex relative">
                <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                  <EnvelopImg />
                </span>
                <input
                  type="email"
                  className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                  name="email"
                  id="email"
                  placeholder="Email"
                  defaultValue={checkout[data.slug]?.email || ""}
                />
                <label
                  htmlFor="email"
                  className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                >
                  Email
                </label>
              </div>

              <div className="flex relative">
                <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                  <PhoneImg />
                </span>
                <input
                  type="tel"
                  className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  defaultValue={checkout[data.slug]?.phone || ""}
                />
                <label
                  htmlFor="phone"
                  className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                >
                  Phone
                </label>
              </div>

              <div className="flex relative">
                <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                  <DateImg />
                </span>
                <input
                  type="date"
                  className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none"
                  name="started_at"
                  id="started_at"
                  placeholder="Start At"
                  defaultValue={checkout[data.slug]?.started_at || ""}
                />
                <label
                  htmlFor="started_at"
                  className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                >
                  Start At
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input type="checkbox" name="accordion" id="shipping-address" className="peer hidden" />
          <label htmlFor="shipping-address" className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]">
            <h6 className="text-xl font-bold">Shipping Address</h6>
            <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
              <ArrowDownImg />
            </span>
          </label>
          <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
            <div className="flex flex-col gap-y-4">
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
        </div>

        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input type="checkbox" name="accordion" id="payment-details" className="peer hidden" />
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

        <section className="relative flex flex-col gap-y-5">
          <h2 className="font-semibold">Send Payment to</h2>
          <div className="flex items-center gap-x-3 bg-white border border-gray1 p-4 rounded-2xl">
            <BCAImg />

            <span className="flex flex-col">
              <span className="flex gap-x-2">
                <h3 className="font-semibold">Ferry Sukma P</h3>
                <span className="text-color3">
                  <VerifiedImg />
                </span>
              </span>
              <span className="text-sm text-gray2">8008129839</span>
            </span>
          </div>

          <div className="flex items-center gap-x-3 bg-white border border-gray1 p-4 rounded-2xl">
            <MandiriImg />

            <span className="flex flex-col">
              <span className="flex gap-x-2">
                <h3 className="font-semibold">Ferry Sukma P</h3>
                <span className="text-color3">
                  <VerifiedImg />
                </span>
              </span>
              <span className="text-sm text-gray2">12379834983281</span>
            </span>
          </div>
        </section>

        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input type="checkbox" name="accordion" id="proof-label" className="peer hidden" checked />
          <label htmlFor="proof-label" className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]">
            <h6 className="text-xl font-bold">Upload Proof of Payment</h6>
            <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
              <ArrowDownImg />
            </span>
          </label>
          <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
            <div className="flex relative">
              <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                <FileImg />
              </span>
              <input
                type="file"
                className="pl-12 w-full pt-8 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none file:hidden"
                name="proof"
                id="proof"
                placeholder="Add an attachment"
                accept="image/*"
              />
              <label
                htmlFor="proof"
                className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-6 peer-placeholder-shown:text-base text-sm transition-all duration-300"
              >
                Add an attachment
              </label>
            </div>
          </div>
        </div>

        <div className="sticky bottom-4 z-50 mb-8">
          <button type="submit" className="bg-color1 text-white rounded-full flex items-center justify-center px-5 w-full py-3">
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormPayment;
