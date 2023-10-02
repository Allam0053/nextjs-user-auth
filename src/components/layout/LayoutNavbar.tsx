// components
import Link from "next/link";
import React from "react";

import { cn as clsxm } from "@/lib/utils";

import { BsFacebook, BsGithub, BsTwitter } from "react-icons/bs";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/buttons/Button";
import { ImInfo } from "react-icons/im";
import UserInfoModal from "@/components/layout/LoggedInUserDetailModal";
import NextImage from "@/components/NextImage";

import BalajiBrandImage from "public/images/balaji_brand.png";
import { useWindowSize } from "usehooks-ts";
import useSearchBar from "@/hooks/useSearchBar/master";
import IconButton from "@/components/buttons/IconButton";
import { HiBars3 } from "react-icons/hi2";

import { HiOutlineSearch, HiOutlineXCircle } from "react-icons/hi";
import { useAtom } from "jotai";
import { selectedVariantAtom } from "@/app/components/Atom";

export type IndexNavbarProps = {
  transparent?: boolean;
  className?: string;
} & Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
  "className"
>;

export default function Navbar({
  transparent = true,
  className,
  ...rest
}: IndexNavbarProps) {
  const { token } = useAuth();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [fadeInStart, setFadeInStart] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setFadeInStart(true);
    }, 500);
  }, []);
  const windowSize = useWindowSize();
  const searchBar = useSearchBar(
    "Cari sesuatu...",
    {
      isText: true,
      id: "search",
    },
    ""
  );
  const [selectedVariant] = useAtom(selectedVariantAtom);
  return (
    <>
      <nav
        className={clsxm(
          "navbar-expand-lg fixed top-0 z-50 flex w-full flex-wrap items-center justify-between px-2 py-3 shadow md:gap-2 md:px-0 md:shadow-none",
          "lg:bg-transparent lg:bg-opacity-100 lg:backdrop-blur-none",
          "bg-white bg-opacity-10 backdrop-blur-lg",
          fadeInStart ? "fade-in-start" : "",
          className
        )}
        {...rest}
      >
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-4 md:w-[75vw]">
          <div
            className="relative flex w-full items-center justify-between lg:static lg:w-auto"
            data-fade="3"
          >
            <Link href="/" className="flex">
              <NextImage
                useSkeleton
                src={BalajiBrandImage.src}
                width={windowSize.width <= 768 ? 42 : 84}
                height={windowSize.width <= 768 ? 32 : 64}
                alt="Balaji"
              />
            </Link>
            <div className="flex w-fit gap-2">
              <IconButton
                icon={HiOutlineSearch}
                onClick={() => setSearchOpen((prev) => !prev)}
                className="h-fit lg:hidden"
                variant={selectedVariant}
                isActive={searchOpen}
              />
              <IconButton
                icon={HiBars3}
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="h-fit lg:hidden"
                variant={`primary-${selectedVariant}` as const}
                isActive={navbarOpen}
              />
            </div>
          </div>

          <div
            className={clsxm(
              "flex-grow items-center rounded md:rounded-none lg:flex lg:flex-grow-0 lg:bg-opacity-0 lg:shadow-none",
              navbarOpen ? "block" : " hidden"
            )}
            id="example-navbar-warning"
          >
            <div className="h-2" />
            <ul className="flex list-none flex-col gap-2 rounded-md bg-white lg:ml-auto lg:flex-row">
              <li className="flex items-center" data-fade="6">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-slate-700 hover:text-slate-500 lg:py-2"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsFacebook className="h-4 w-4" />
                  <span className="ml-2 inline-block lg:hidden">Share</span>
                </a>
              </li>

              <li className="flex items-center" data-fade="7">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-slate-700 hover:text-slate-500 lg:py-2"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsTwitter className="h-4 w-4" />
                  <span className="ml-2 inline-block lg:hidden">Tweet</span>
                </a>
              </li>

              <li
                className="items-centerbg-white flex rounded-md"
                data-fade="8"
              >
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-slate-700 hover:text-slate-500 lg:py-2"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub className="h-4 w-4" />
                  <span className="ml-2 inline-block lg:hidden">Star</span>
                </a>
              </li>
            </ul>
            <div className="h-2" />
          </div>

          <div
            className={clsxm(
              "flex-grow items-center rounded md:rounded-none lg:flex lg:max-w-[240px] lg:bg-opacity-0 lg:shadow-none",
              searchOpen ? " block" : " hidden"
            )}
          >
            <div className="h-2" />
            <searchBar.SearchBarComponent />
            <div className="h-2" />
          </div>
        </div>
      </nav>
    </>
  );
}
