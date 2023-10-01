"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import NextImage from "@/components/NextImage";

import NachosPhoneImage from "public/images/item/phone/1.png";
import NachosBigImage from "public/images/item/other/1.png";
import CrunchexPhoneImage from "public/images/item/phone/2.png";
import CrunchexBigImage from "public/images/item/other/2.png";
import TomatoPhoneImage from "public/images/item/phone/3.png";
import TomatoBigImage from "public/images/item/other/3.png";
import ChaskaPhoneImage from "public/images/item/phone/4.png";
import ChaskaBigImage from "public/images/item/other/4.png";
import { WindowSize } from "@/types/window";
import { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type Variant = "nachos" | "crunchex" | "tomato" | "chaska";

export type ImageComponentProps = {
  windowSize: WindowSize;
  bigImage: StaticImageData;
  phoneImage: StaticImageData;

  imageWidth?: number;
  isSlightlyRotate?: boolean;
  withShadow?: boolean;
};

export function ImageComponent({
  windowSize,
  bigImage,
  phoneImage,
  imageWidth,
  isSlightlyRotate = true,
  withShadow = true,
}: ImageComponentProps) {
  const imageSource = React.useMemo(() => {
    if (windowSize.width >= 768) {
      return bigImage;
    }
    return phoneImage;
  }, [windowSize.width]);
  const imageSize = React.useMemo(() => {
    if (imageWidth) {
      return {
        width: imageWidth,
        height: heightDependOnWidth(imageWidth),
      };
    }
    if (windowSize.width >= 1024) {
      const currentWidth = 240;
      return {
        width: currentWidth,
        height: heightDependOnWidth(currentWidth),
      };
    }
    const currentWidth = 180;
    return {
      width: currentWidth,
      height: heightDependOnWidth(currentWidth),
    };
  }, [windowSize]);
  return (
    <div className="relative flex h-fit w-fit">
      {withShadow && (
        <NextImage
          useSkeleton
          src={imageSource.src}
          width={imageSize.width}
          height={imageSize.height}
          alt="Balaji"
          className={cn(
            "absolute top-0 blur-[25px]",
            isSlightlyRotate && "rotate-[-8deg]"
          )}
        />
      )}
      <NextImage
        useSkeleton
        src={imageSource.src}
        width={imageSize.width}
        height={imageSize.height}
        alt="Balaji"
        className={cn("rotate-0", isSlightlyRotate && "rotate-[-8deg]")}
      />
    </div>
  );
}

export function heightDependOnWidth(width: number) {
  return Math.floor((width * 4) / 3);
}

export function NachosImageComponent({ ...rest }: { windowSize: WindowSize }) {
  return ImageComponent({
    bigImage: NachosBigImage,
    phoneImage: NachosPhoneImage,
    ...rest,
  });
}

export function CrunchexImageComponent({
  ...rest
}: {
  windowSize: WindowSize;
}) {
  return ImageComponent({
    bigImage: CrunchexBigImage,
    phoneImage: CrunchexPhoneImage,
    ...rest,
  });
}

export function TomatoImageComponent({ ...rest }: { windowSize: WindowSize }) {
  return ImageComponent({
    bigImage: TomatoBigImage,
    phoneImage: TomatoPhoneImage,
    ...rest,
  });
}

export function ChaskaImageComponent({ ...rest }: { windowSize: WindowSize }) {
  return ImageComponent({
    bigImage: ChaskaBigImage,
    phoneImage: ChaskaPhoneImage,
    ...rest,
  });
}

export function NachosOnDisplayImageComponent({
  ...rest
}: {
  windowSize: WindowSize;
}) {
  return ImageComponent({
    bigImage: NachosBigImage,
    phoneImage: NachosPhoneImage,
    imageWidth: 100,
    isSlightlyRotate: false,
    withShadow: false,
    ...rest,
  });
}

export function CrunchexOnDisplayImageComponent({
  ...rest
}: {
  windowSize: WindowSize;
}) {
  return ImageComponent({
    bigImage: CrunchexBigImage,
    phoneImage: CrunchexPhoneImage,
    imageWidth: 100,
    isSlightlyRotate: false,
    withShadow: false,
    ...rest,
  });
}

export function TomatoOnDisplayImageComponent({
  ...rest
}: {
  windowSize: WindowSize;
}) {
  return ImageComponent({
    bigImage: TomatoBigImage,
    phoneImage: TomatoPhoneImage,
    imageWidth: 100,
    isSlightlyRotate: false,
    withShadow: false,
    ...rest,
  });
}

export function ChaskaOnDisplayImageComponent({
  ...rest
}: {
  windowSize: WindowSize;
}) {
  return ImageComponent({
    bigImage: ChaskaBigImage,
    phoneImage: ChaskaPhoneImage,
    imageWidth: 100,
    isSlightlyRotate: false,
    withShadow: false,
    ...rest,
  });
}
