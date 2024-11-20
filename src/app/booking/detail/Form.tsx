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
import { TBookingDetail, TPackages } from "@/components/Packages/type";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useFormState } from "react-dom";
import { submitPayment } from "@/components/Packages/action";
import "@/libs/thousands";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: TBookingDetail;
};

function FormDetailBooking({ data }: Props) {
  return (
    <>
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
                  defaultValue={data.name}
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
                  defaultValue={data.email}
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
                  defaultValue={data.phone}
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
                  defaultValue={data.started_at}
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
                  <span className="font-semibold">{format(data.started_at, "dd LLLL yyyy")}</span>
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
                  <span className="font-semibold">{data.city}</span>
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
                  defaultValue={data.address}
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
                  defaultValue={data.post_code}
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
                  defaultValue={data.notes}
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
                  <span className="font-semibold">Rp {data.price.thousands()}</span>
                </div>
              </div>

              <div className="flex relative">
                <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                  <TimeImg />
                </span>
                <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                  <span className="text-sm text-gray2">Duration</span>
                  <span className="font-semibold">
                    {data.duration} Day{data.duration > 1 && `s`} Regularly
                  </span>
                </div>
              </div>

              <div className="flex relative">
                <span className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                  <PeopleImg />
                </span>
                <div className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                  <span className="text-sm text-gray2">Quantity</span>
                  <span className="font-semibold">{data.quantity} People</span>
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
                  <span className="font-semibold">Rp {data.total_tax_amount.thousands()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border border-gray1 rounded-2xl p-4">
          <input checked type="checkbox" name="accordion" id="proof" className="peer hidden" defaultChecked />
          <label htmlFor="proof" className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]">
            <h6 className="text-xl font-bold">Upload Proof of Payment</h6>
            <span className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2">
              <ArrowDownImg />
            </span>
          </label>
          <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
            <span className="relative w-[390px] aspect-video rounded-2xl overflow-hidden">
              <Image fill className="w-full h-full object-cover absolute" src={`${process.env.NEXT_PUBLIC_HOST_API}/${data.proof}`} alt={data.name} sizes="(max-width: 768px)" />
            </span>
          </div>
        </div>

        <div className="sticky bottom-4 z-50 mb-8">
          <Link href="/" className="bg-color1 text-white rounded-full flex items-center justify-center px-5 w-full py-3">
            Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default FormDetailBooking;
