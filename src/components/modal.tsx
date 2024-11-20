"use client";

import useQueryParams from "@/libs/useQueryParams";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";

export type TmodalRegistered = "tier" | "filter-category";
export type TmodalPosRegistered = "center" | "bottom";

export function RouterBack({ className, children, onClick }: { className?: string; children?: ReactNode; onClick?: () => void }) {
  const router = useRouter();
  return (
    <span
      className={["cursor-pointer", className ? className : "absolute inset-0 z-10"].join(" ")}
      onClick={() => {
        onClick && onClick();
        router.back();
      }}
    >
      {children}
    </span>
  );
}
export function PreventScrolling() {
  useLayoutEffect(() => {
    document.querySelector("body")!.classList.add("overflow-hidden");

    return () => {
      document.querySelector("body")!.classList.remove("overflow-hidden");
    };
  }, []);
  return null;
}

export function OpenModal({
  className,
  children,
  queries,
  modal,
  modalPosition,
}: {
  modal: TmodalRegistered;
  modalPosition?: TmodalPosRegistered;
  queries: { [key: string | number]: string | number };
  children?: ReactNode;
  className?: string;
}) {
  const params = useQueryParams();
  return (
    <Link
      href={{
        query: {
          ...params,
          ...queries,
          modal,
          "modal-pos": modalPosition,
        },
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
