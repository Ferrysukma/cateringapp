"use client";
import PhoneImg from "@/assets/images/phone.svg";
import FileImg from "@/assets/images/file.svg";
import { useFormState } from "react-dom";
import { navigateBooking } from "@/components/Packages/action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {};

const initialState: {
  message: string;
  field: string;
  data?: any;
} = {
  message: "",
  field: "",
};

function FormBooking({}: Props) {
  const router = useRouter();
  const [state, formAction] = useFormState(navigateBooking, initialState);

  useEffect(() => {
    if (!!state.field && state.field !== "") {
      const element = document.getElementById(state.field)!;
      element.focus();
    } else if (state.data) {
      router.push(`/booking/detail?phone=${state.data.phone}&trx-id=${state.data.booking_trx_id}`);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <section className="relative flex flex-col items-center gap-y-4 w-full px-4">
        <h2 className="font-bold text-2xl text-center">View Your Order</h2>

        <div className="flex relative w-full">
          <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
            <PhoneImg />
          </span>
          <input
            type="tel"
            className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
            name="phone"
            id="phone"
            placeholder="Phone"
          />
          <label
            htmlFor="phone"
            className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
          >
            Phone
          </label>
        </div>

        <div className="flex relative w-full">
          <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
            <FileImg />
          </span>
          <input
            type="text"
            className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
            name="booking_trx_id"
            id="booking_trx_id"
            placeholder="booking_trx_id"
          />
          <label
            htmlFor="booking_trx_id"
            className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
          >
            Booking Transaction ID
          </label>
        </div>

        <div className="flex w-full">
          <button type="submit" className="bg-color1 text-white rounded-full inline-flex items-center justify-center px-5 py-3 w-full">
            Find My Order
          </button>
        </div>
      </section>
    </form>
  );
}

export default FormBooking;
