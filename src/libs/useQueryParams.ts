"use client";

import { useSearchParams } from "next/navigation";

function useQueryParams() {
  const query = useSearchParams();
  const param: { [key: string]: string } = {};

  for (const [key, value] of query.entries()) {
    param[key] = value;
  }
  return param;
}

export default useQueryParams;
