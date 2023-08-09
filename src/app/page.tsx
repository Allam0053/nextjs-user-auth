"use client";

import Head from "next/head";
import * as React from "react";

import ArrowLink from "@/components/links/ArrowLink";
import ButtonLink from "@/components/links/ButtonLink";
import UnderlineLink from "@/components/links/UnderlineLink";
import UnstyledLink from "@/components/links/UnstyledLink";
import { InView } from "react-intersection-observer";

import { cn as clsxm } from "@/lib/utils";

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from "~/svg/Logo.svg";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";
import HomeSectionSearchWrapper from "@/components/layout/HomeSectionSearchWrapper";
import useSearchBar from "@/hooks/useSearchBar/master";
import HomeSectionIngredient from "@/components/layout/HomeSectionIngredient";
import Typography from "@/components/Typography";
import LayoutFooter from "@/components/layout/LayoutFooter";

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { query, SearchBarComponent } = useSearchBar("Cari kode, nama, PIC...");
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo
        templateTitle="Welcome Recipes Hunter"
        description={`Our website is organized around a comprehensive ingredient
                      database, which allows you to search for recipes based on
                      specific ingredients. Simply enter the ingredient you're
                      looking for, and our platform will provide you with a
                      variety of recipe options that feature that ingredient.`}
        date={new Date("05/03/2023").toISOString()}
      />
      <main className="flex h-full w-full flex-col items-center">
        <InView triggerOnce rootMargin="-40% 0px">
          {({ ref, inView }) => (
            <section
              className={clsxm(
                "layout flex flex-col bg-white py-12",
                inView && "fade-in-start"
              )}
              id="search-ingredients"
              ref={ref}
            >
              <HomeSectionSearchWrapper>
              </HomeSectionSearchWrapper>
            </section>
          )}
        </InView>
        <LayoutFooter />
      </main>
    </Layout>
  );
}
