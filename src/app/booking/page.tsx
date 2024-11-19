import BottomBar from "@/components/Bar";
import Image from "next/image";
import FormBooking from "./Form";

function BookingPage() {
  return (
    <>
      <section className="relative px-8 mt-28">
        <figure className="w-full h-[219px] relative">
          <Image fill className="w-full h-full object-cover object-center" src="/images/chef.png" alt="Chef" sizes="(max-width: 768px)" />
        </figure>
      </section>

      <FormBooking />

      <BottomBar addClass="mt-36" />
    </>
  );
}

export default BookingPage;
