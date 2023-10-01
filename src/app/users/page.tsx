"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Layout, { Section, ShadowedBox } from "@/components/layout/Layout";
import ClientComponent from "./components/client";
import TanStackReactQueryProveider from "@/components/providers/ReactQuery";

export default function Page() {
  return (
    <Layout isHScreen>
      <Section className="flex-1">
        <ClientComponent />
      </Section>
    </Layout>
  );
}
