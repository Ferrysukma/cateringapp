"use client";

import ArrowLeft from "@/assets/images/arrow-left.svg";
import MoreImg from "@/assets/images/dotmore.svg";
import ThumbImg from "@/assets/images/thumb-up.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

type Tback = {
  historyBack: boolean;
} & ({ historyBack: true } | { historyBack: false; url: string });

type Tmore = {
  display: boolean;
} & ({ display: false } | { display: true; onClick: MouseEventHandler<HTMLSpanElement> });

type Props = {
  appendClassName: string;
  title?: string;
  back: Tback;
  thumb: Tmore;
  more: Tmore;
};

function Headers({ appendClassName, title, back, thumb, more }: Props) {
  const router = useRouter();
  return (
    <header className={["flex items-center justify-between px-4 w-full gap-x-4", appendClassName].join(" ")}>
      {back.historyBack ? (
        <span onClick={router.back} className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-color2 cursor-pointer">
          <ArrowLeft />
        </span>
      ) : (
        <Link href={back.url} className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-color2 cursor-pointer">
          <ArrowLeft />
        </Link>
      )}

      {title ? (
        <>
          <h1 className="mx-auto text-lg font-semibold">{title}</h1>
          {!thumb && !more && <span className="ml-auto"></span>}
        </>
      ) : (
        <span className="mx-auto"></span>
      )}
      <span className="ml-auto"></span>

      {thumb.display && (
        <span className="" onClick={thumb.onClick}>
          <ThumbImg />
        </span>
      )}

      {more.display && (
        <span className="" onClick={more.onClick}>
          <MoreImg />
        </span>
      )}
    </header>
  );
}

export default Headers;
