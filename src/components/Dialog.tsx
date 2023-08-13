import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { RxCross2 } from "react-icons/rx";

import { cn as clsxm } from "@/lib/utils";

type DialogActionProps = React.ComponentPropsWithRef<"div">;
type DialogContentProps = Dialog.DialogContentProps & {
  withoutClose?: boolean;
  withoutOverlay?: boolean;
  isFullScreen?: boolean;
  overlayClassName?: string;
};

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(
  (
    {
      children,
      className,
      withoutClose,
      withoutOverlay,
      isFullScreen,
      overlayClassName,
      ...props
    },
    forwardedRef
  ) => (
    <Dialog.Portal>
      {!withoutOverlay && (
        <Dialog.Overlay
          className={clsxm(
            "data-[state=open]:animate-overlayShow fixed inset-0 z-[2] bg-black bg-opacity-50",
            overlayClassName
          )}
        />
      )}
      <Dialog.Content
        {...props}
        className={clsxm(
          "data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[3] max-h-[85vh] translate-x-[-50%] translate-y-[-50%]  overflow-y-scroll bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none",
          isFullScreen ? "w-[95vw] max-w-[95vw]" : "w-[90vw] max-w-[560px]",
          className
        )}
        ref={forwardedRef}
      >
        {children}
        {!withoutClose && (
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <RxCross2 />
            </button>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  )
);

export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  Dialog.DialogOverlayProps
>(({ children, className }, forwardedRef) => (
  <Dialog.Overlay
    className={clsxm(
      "data-[state=open]:animate-overlayShow fixed inset-0 bg-black bg-opacity-50",
      className
    )}
    ref={forwardedRef}
  >
    {children}
  </Dialog.Overlay>
));

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  Dialog.DialogTitleProps
>(({ children, className, ...props }, forwardedRef) => (
  <Dialog.Title
    {...props}
    className={clsxm("m-0 text-base font-medium", className)}
    ref={forwardedRef}
  >
    {children}
  </Dialog.Title>
));

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  Dialog.DialogDescriptionProps
>(({ children, className, ...props }, forwardedRef) => (
  <Dialog.Description
    {...props}
    className={clsxm("mb-5 mt-[10px] text-sm leading-normal", className)}
    ref={forwardedRef}
  >
    {children}
  </Dialog.Description>
));

//# if !children maka render tombol di pojok kanan atas
export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  Dialog.DialogCloseProps
>(({ children, className, ...props }, forwardedRef) => (
  <Dialog.Close
    asChild
    ref={forwardedRef}
    className={clsxm(className)}
    {...props}
  >
    {!children && (
      <button
        className={clsxm(
          "text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none",
          className
        )}
        aria-label="Close"
      >
        <RxCross2 />
      </button>
    )}
    {children}
  </Dialog.Close>
));

export const DialogAction = React.forwardRef<HTMLDivElement, DialogActionProps>(
  ({ children, className, ...props }, forwardRef) => (
    <div
      {...props}
      className={clsxm("mt-5 flex justify-end gap-4", className)}
      ref={forwardRef}
    >
      {children}
    </div>
  )
);

export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;
export const DialogPortal = Dialog.Portal;
