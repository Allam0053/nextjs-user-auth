import NextImage from "@/components/NextImage";
import { WindowSize } from "@/types/window";
import { StaticImageData } from "next/image";
import ImageChilli from "public/images/flavor/1.png";
import ImageCorn from "public/images/flavor/2.png";
import ImageFire from "public/images/flavor/3.png";
import React from "react";
type FlavorImageComponentProps = {
  windowSize: WindowSize;
  imageSource: StaticImageData;
};
export function FireComponent({ ...rest }: { windowSize: WindowSize }) {
  return (
    <div className="h-8 w-8 rounded-full bg-amber-600 lg:h-12 lg:w-12">
      <FlavorImageComponent imageSource={ImageFire} {...rest} />
    </div>
  );
}

export function CornComponent({ ...rest }: { windowSize: WindowSize }) {
  return (
    <div className="h-8 w-8 rounded-full bg-red-600 lg:h-12 lg:w-12">
      <FlavorImageComponent imageSource={ImageCorn} {...rest} />
    </div>
  );
}

export function ChilliComponent({ ...rest }: { windowSize: WindowSize }) {
  return (
    <div className="h-8 w-8 rounded-full bg-emerald-600 lg:h-12 lg:w-12">
      <FlavorImageComponent imageSource={ImageChilli} {...rest} />
    </div>
  );
}

export function FlavorImageComponent({
  imageSource,
  windowSize,
}: FlavorImageComponentProps) {
  const imageSize = React.useMemo(() => {
    if (windowSize.width >= 1024) {
      const currentWidth = 48;
      return {
        width: currentWidth,
        height: currentWidth,
      };
    }
    const currentWidth = 32;
    return {
      width: currentWidth,
      height: currentWidth,
    };
  }, [windowSize]);
  return (
    <NextImage
      useSkeleton
      src={imageSource.src}
      width={imageSize.width}
      height={imageSize.height}
      alt="Balaji"
    />
  );
}
