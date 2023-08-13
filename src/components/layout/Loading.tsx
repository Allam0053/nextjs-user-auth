import React from "react";
import { ImSpinner2 } from "react-icons/im";

import { cn as clsxm } from "@/lib/utils";

type LoadingPageProps = {
  isLoading: boolean;
} & React.ComponentPropsWithRef<"div">;

export default function LoadingPage({
  // children,
  ref,
  className,
  isLoading: passedIsLoading = true,
}: LoadingPageProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!passedIsLoading && isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [isLoading, passedIsLoading]);

  return (
    <div
      ref={ref}
      className={clsxm(
        "flex h-screen w-full flex-col items-center justify-center",
        passedIsLoading ? "" : "fade-out",
        isLoading ? "" : "hidden",
        className
      )}
    >
      <div className="flex w-full justify-center">
        <div className="relative flex h-full items-center">
          <ImSpinner2 className="animate-spin" />
        </div>
      </div>
    </div>
  );
}

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
  return <div className="relative h-screen w-screen">{children}</div>;
}
