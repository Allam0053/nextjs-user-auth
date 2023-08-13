import * as React from "react";

import LayoutNavbar from "@/components/layout/LayoutNavbar";
import { cn } from "@/lib/utils";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   // Put Header or Footer Here
//   return (
//     <>
//       <LayoutNavbar />
//       {children}
//     </>
//   );
// }
export default function Layout({
  children,
  isHScreen,
}: {
  children: React.ReactNode;
  isHScreen?: boolean;
}) {
  // Put Header or Footer Here
  return (
    <>
      <main className={cn("flex w-full flex-col", isHScreen && "h-screen")}>
        <div className="flex h-16 w-full">
          <LayoutNavbar />
        </div>
        {children}
      </main>
    </>
  );
}

export type LayoutWithRefProps = React.ComponentPropsWithRef<"main"> & {
  isHScreen?: boolean;
};

export const LayoutWithRef = React.forwardRef<
  HTMLDivElement,
  LayoutWithRefProps
>(({ children, isHScreen }, forwardRef) => (
  <>
    <LayoutNavbar />
    <main
      ref={forwardRef}
      className={cn("flex w-full flex-col", isHScreen && "h-screen")}
    >
      <div className="flex h-16 w-full">
        <LayoutNavbar />
      </div>
      {children}
    </main>
  </>
));

export const Section = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<"section">
>(({ children, className }, forwardRef) => (
  <section
    className={cn("relative flex h-full w-full px-4 pb-14 pt-2", className)}
    ref={forwardRef}
  >
    {children}
  </section>
));

export const ShadowedBox = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<"div">
>(({ children, className }, forwardRef) => (
  <div
    className={cn(
      "shadow-sm-one flex h-full w-full flex-col rounded-lg bg-white p-4",
      className
    )}
    ref={forwardRef}
  >
    {children}
  </div>
));
