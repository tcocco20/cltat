"use client";

import { SQUARE_SDK_URL } from "@/lib/constants";
import Script from "next/script";

export default function SquareWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script src={SQUARE_SDK_URL} strategy="afterInteractive" />
      {children}
    </>
  );
}
