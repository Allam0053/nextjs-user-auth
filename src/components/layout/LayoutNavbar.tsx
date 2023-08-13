// components
import Link from "next/link";
import React from "react";

import { cn as clsxm } from "@/lib/utils";

import { BsFacebook, BsGithub, BsTwitter } from "react-icons/bs";
import { useAuth } from "@/hooks/useAuth";
import Typography from "../Typography";

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
  const { email, token } = useAuth();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [fadeInStart, setFadeInStart] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setFadeInStart(true);
    }, 500);
  }, []);
  return (
    <>
      <nav
        className={clsxm(
          "navbar-expand-lg fixed top-0 z-50 flex w-full flex-wrap items-center justify-between px-2 py-3 shadow",
          transparent ? "bg-white bg-opacity-10 backdrop-blur-lg" : "bg-white",
          fadeInStart ? "fade-in-start" : "",
          className
        )}
        {...rest}
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div
            className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start"
            data-fade="3"
          >
            <Link
              href="/"
              className="mr-4 inline-block whitespace-nowrap rounded-md bg-white px-2 py-1 text-sm font-bold uppercase leading-relaxed text-slate-700 "
            >
              Nextjs Auth
            </Link>
            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent bg-white px-3 py-1 text-xl leading-none outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <Typography variant="h6">
            {email} {token}
          </Typography>
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
