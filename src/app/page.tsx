"use client";
import * as React from "react";

import { cn as clsxm } from "@/lib/utils";
import Layout from "@/components/layout/Layout";
import HomeSectionSearchWrapper from "@/components/layout/HomeSectionSearchWrapper";
import LayoutFooter from "@/components/layout/LayoutFooter";
import LoginForm from "./components/LoginForm";
import TanStackReactQueryProveider from "@/components/providers/ReactQuery";

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <TanStackReactQueryProveider>
      <Layout isHScreen>
        {/* <Seo templateTitle='Home' /> */}
        <main className="flex h-full w-full flex-col items-center">
          <section
            className={clsxm("layout flex flex-col bg-white py-12")}
            id="search-ingredients"
          >
            <HomeSectionSearchWrapper>
              <LoginForm />
            </HomeSectionSearchWrapper>
          </section>
          {/* {({ ref, inView }) => (
        <InView triggerOnce rootMargin="-40% 0px">
            
        </InView>
          )} */}
          <LayoutFooter />
        </main>
      </Layout>
    </TanStackReactQueryProveider>
  );
}
