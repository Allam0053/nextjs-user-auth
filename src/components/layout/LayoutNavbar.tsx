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
import { useSelectedVariant } from "@/app/page";

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
  React.useEffect(() => {
    setTimeout(() => {
      setFadeInStart(true);
    }, 500);
  }, []);
  const windowSize = useWindowSize();
  const searchBar = useSearchBar();
  const [selectedVariant] = useSelectedVariant();
  return (
    <>
      <nav
        className={clsxm(
          "navbar-expand-lg fixed top-0 z-50 flex w-full flex-wrap items-center justify-between px-2 py-3 shadow md:gap-2 md:px-0 md:shadow-none",
          transparent ? "bg-white bg-opacity-10 backdrop-blur-lg" : "bg-white",
          fadeInStart ? "fade-in-start" : "",
          className
        )}
        {...rest}
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 md:w-[75vw]">
          <div
            className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start"
            data-fade="3"
          >
            <Link
              href="/"
              className="mr-4 inline-block whitespace-nowrap rounded-md px-2 py-1 text-sm font-bold uppercase leading-relaxed"
            >
              <NextImage
                useSkeleton
                src={BalajiBrandImage.src}
                className="w-[42px] lg:w-[167px]"
                width={windowSize.width <= 768 ? 42 : 84}
                height={windowSize.width <= 768 ? 32 : 64}
                alt="Balaji"
              />
            </Link>
            <div>
              <searchBar.SearchBarComponent />
            </div>
            <IconButton
              icon={HiBars3}
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="h-fit"
              variant={`primary-${selectedVariant}` as const}
            />
          </div>
          <div
            className={clsxm(
              "flex-grow items-center rounded bg-white md:rounded-none lg:flex lg:bg-opacity-0 lg:shadow-none",
              navbarOpen ? " block" : " hidden"
            )}
            id="example-navbar-warning"
          >
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
          </div>
        </div>
      </nav>
    </>
  );
}
