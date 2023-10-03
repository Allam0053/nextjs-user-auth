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
import { BiSolidHome } from "react-icons/bi";
import { useAtom } from "jotai";
import { cartOpenAtom, selectedVariantAtom } from "@/app/components/Atom";
import { FaCircleInfo, FaHandshakeSimple } from "react-icons/fa6";
import { BsFillTriangleFill } from "react-icons/bs";

import ButtonLink from "../links/ButtonLink";
import { BsCartPlus } from "react-icons/bs";

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
  const [cartOpen, setCartOpen] = useAtom(cartOpenAtom);
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
                icon={BsCartPlus}
                onClick={() =>
                  setCartOpen((prev) => {
                    return "main";
                  })
                }
                className="h-fit lg:hidden"
                variant={selectedVariant}
                isActive={
                  !(
                    cartOpen === "closed" ||
                    (cartOpen as unknown as boolean) === false
                  )
                }
              />
              <IconButton
                icon={HiBars3}
                onClick={() => setNavbarOpen((prev) => !prev)}
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
            <ul className="flex list-none flex-col gap-2 rounded-md bg-white lg:ml-auto lg:flex-row lg:bg-transparent">
              <li className="flex items-center" data-fade="6">
                <ButtonLink
                  isActive
                  variant="ghost"
                  href={"#"}
                  leftIcon={BiSolidHome}
                  primary={selectedVariant}
                  className="font-semibold uppercase"
                  size="sm"
                >
                  Home
                </ButtonLink>
              </li>
              <li className="flex items-center" data-fade="6">
                <ButtonLink
                  variant="ghost"
                  href={"#"}
                  leftIcon={FaCircleInfo}
                  primary={selectedVariant}
                  className="font-semibold uppercase"
                  size="sm"
                >
                  About
                </ButtonLink>
              </li>

              <li className="flex items-center" data-fade="6">
                <ButtonLink
                  variant="ghost"
                  href={"#"}
                  leftIcon={BsFillTriangleFill}
                  primary={selectedVariant}
                  className="font-semibold uppercase"
                  size="sm"
                >
                  Chip
                </ButtonLink>
              </li>
              <li className="flex items-center" data-fade="6">
                <ButtonLink
                  variant="ghost"
                  href={"#"}
                  leftIcon={FaHandshakeSimple}
                  primary={selectedVariant}
                  className="font-semibold uppercase"
                  size="sm"
                >
                  Services
                </ButtonLink>
              </li>
            </ul>
            <div className="h-2" />
          </div>

          <div
            className={clsxm(
              "flex-grow items-center gap-2 rounded md:rounded-none lg:flex lg:max-w-[240px] lg:bg-opacity-0 lg:shadow-none",
              searchOpen ? " block" : " hidden"
            )}
          >
            <div className="h-2" />
            <searchBar.SearchBarComponent />
            <IconButton
              icon={BsCartPlus}
              onClick={() =>
                setCartOpen((prev) => {
                  return "main";
                })
              }
              className="hidden h-fit lg:inline-flex"
              variant={selectedVariant}
              isActive={
                !(
                  cartOpen === "closed" ||
                  (cartOpen as unknown as boolean) === false
                )
              }
            />
            <div className="h-2" />
          </div>
        </div>
      </nav>
    </>
  );
}
