"use client";

import type { ReactNode } from "react";

import { PageTransition } from "@/components/animation/page-transition";

export default function Template({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <PageTransition>{children}</PageTransition>;
}
