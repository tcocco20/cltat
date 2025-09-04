"use client";

import Script from "next/script";

export default function SquareWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src="https://sandbox.web.squarecdn.com/v1/square.js"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
