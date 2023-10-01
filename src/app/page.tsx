"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Layout, { Section, ShadowedBox } from "@/components/layout/Layout";
import TanStackReactQueryProveider from "@/components/providers/ReactQuery";
import { useWindowSize } from "usehooks-ts";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";

type Variant = "nachos" | "crunchex" | "tomato" | "chaska";

const qtyId = wording.form.QTY.toLowerCase();
const selectedVariantAtom = atom<Variant>("nachos");
export const useSelectedVariant = () => useAtom(selectedVariantAtom);

export default function Page() {
  const windowSize = useWindowSize();
  const methods = useForm({
    mode: "onTouched",
  });
  const qtyWatch = methods.watch(qtyId);

  const [selectedVariant, setSelectedVariant] = useSelectedVariant();
  const selectNachosFn = React.useCallback(
    () => setSelectedVariant("nachos"),
    []
  );
  const selectCrunchexFn = React.useCallback(
    () => setSelectedVariant("crunchex"),
    []
  );
  const selectTomatoFn = React.useCallback(
    () => setSelectedVariant("tomato"),
    []
  );
  const selectChaskaFn = React.useCallback(
    () => setSelectedVariant("chaska"),
    []
  );

  const [query, setQuery] = React.useState("");
  const [onChangeValue, setOnChangeValue] = React.useState(0);
  // const [inputSearch, setInputSearch] = useState('');
  const { handleSubmit, reset, setValue } = methods;
  const onChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    setOnChangeValue(Number(get(event, "target.value", 0)));
    setValue(qtyId, Number(get(event, "target.value", 0)));
  }, []);

  const onMinusFn = React.useCallback(() => {
    setOnChangeValue((prev) => (prev > 0 ? prev - 1 : 0));
    setValue(qtyId, Number(qtyWatch) > 0 ? qtyWatch - 1 : 0);
  }, [qtyWatch]);

  const onPlusFn = React.useCallback(() => {
    if (!(Number(qtyWatch) >= 0)) {
      setOnChangeValue(1);
      setValue(qtyId, 1);
      return;
    }
    setOnChangeValue((prev) => prev + 1);
    setValue(qtyId, Number(qtyWatch + 1));
  }, [qtyWatch]);

  return (
    <Layout isHScreen>
      <Section className={cn("w-full flex-col", "md:w-[75vw]")} id="main">
        <div className="h-[48px] w-full" />
        <Typography variant="h1" className="text-center">
          {wording[selectedVariant].TITLE}
        </Typography>
        <Typography variant="c2" className="text-center">
          {wording[selectedVariant].DESCRIPTION}
        </Typography>
        <div className="h-8" />
        <div className="relative flex w-full justify-center">
          {selectedVariant === "crunchex" ? (
            <CrunchexImageComponent windowSize={windowSize} />
          ) : selectedVariant === "tomato" ? (
            <TomatoImageComponent windowSize={windowSize} />
          ) : selectedVariant === "chaska" ? (
            <ChaskaImageComponent windowSize={windowSize} />
          ) : (
            <NachosImageComponent windowSize={windowSize} />
          )}
        </div>
        <div className="h-8" />
      </Section>
      <Section
        className={cn(
          "w-full flex-1 flex-col rounded-t-lg bg-white",
          "md:w-[75vw]"
        )}
        id="cart-addition"
      >
        <form className="w-full">
          <div className="w-full">
            <Typography
              as="label"
              variant="s3"
              className="mb-1 flex w-48"
              htmlFor={wording.form.VARIANT_LABEL.toLowerCase()}
            >
              {wording.form.VARIANT_LABEL}
            </Typography>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="nachos"
                size="xs"
                className="w-full"
                onClick={selectNachosFn}
                isActive={selectedVariant === "nachos"}
              >
                {wording.nachos.BUTTON}
              </Button>
              <Button
                variant="crunchex"
                size="xs"
                className="w-full"
                onClick={selectCrunchexFn}
                isActive={selectedVariant === "crunchex"}
              >
                {wording.crunchex.BUTTON}
              </Button>
              <Button
                variant="tomato"
                size="xs"
                className="w-full"
                onClick={selectTomatoFn}
                isActive={selectedVariant === "tomato"}
              >
                {wording.tomato.BUTTON}
              </Button>
              <Button
                variant="chaska"
                size="xs"
                className="w-full"
                onClick={selectChaskaFn}
                isActive={selectedVariant === "chaska"}
              >
                {wording.chaska.BUTTON}
              </Button>
            </div>
          </div>
          <div className="h-4" />
          <div className="grid w-full grid-cols-2">
            <Typography
              as="label"
              variant="s3"
              className="mb-1 flex w-48"
              htmlFor={qtyId}
            >
              {wording.form.QTY}
            </Typography>
            <FormProvider {...methods}>
              <Input
                isText={false}
                id={qtyId}
                label={null}
                placeholder="0"
                leftNode={
                  <button type="button" className="p-1" onClick={onMinusFn}>
                    <FiMinusCircle className="text-typo-icons text-xl" />
                  </button>
                }
                className="w-full text-right"
                rightNode={
                  <button type="button" className="p-1" onClick={onPlusFn}>
                    <FiPlusCircle className="text-typo-icons text-xl" />
                  </button>
                }
                onChange={onChange}
              />
            </FormProvider>
          </div>
          <div className="h-4" />
          <Button
            className="w-full justify-between"
            leftIcon={BsCartPlus}
            rightIcon={" "}
            variant={`primary-${selectedVariant}` as const}
          >
            {wording.form.SUBMIT}
          </Button>
        </form>
      </Section>
    </Layout>
  );
}

import NachosPhoneImage from "public/images/item/phone/1.png";
import NachosBigImage from "public/images/item/other/1.png";
import CrunchexPhoneImage from "public/images/item/phone/2.png";
import CrunchexBigImage from "public/images/item/other/2.png";
import TomatoPhoneImage from "public/images/item/phone/3.png";
import TomatoBigImage from "public/images/item/other/3.png";
import ChaskaPhoneImage from "public/images/item/phone/4.png";
import ChaskaBigImage from "public/images/item/other/4.png";
import { WindowSize } from "@/types/window";
import wording from "@/constant/wording";
import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { FormProvider, useForm } from "react-hook-form";
import { get } from "lodash";
import { BsCartPlus } from "react-icons/bs";
import { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { atom, useAtom } from "jotai";
type ImageComponentProps = {
  windowSize: WindowSize;
  bigImage: StaticImageData;
  phoneImage: StaticImageData;
};

function NachosImageComponent({ ...rest }: { windowSize: WindowSize }) {
  return ImageComponent({
    bigImage: NachosBigImage,
    phoneImage: NachosPhoneImage,
    ...rest,
  });
}

function CrunchexImageComponent({ ...rest }: { windowSize: WindowSize }) {
  return ImageComponent({
    bigImage: CrunchexBigImage,
    phoneImage: CrunchexPhoneImage,
    ...rest,
  });
}

function TomatoImageComponent({ ...rest }: { windowSize: WindowSize }) {
  return ImageComponent({
    bigImage: TomatoBigImage,
    phoneImage: TomatoPhoneImage,
    ...rest,
  });
}

function ChaskaImageComponent({ ...rest }: { windowSize: WindowSize }) {
  return ImageComponent({
    bigImage: ChaskaBigImage,
    phoneImage: ChaskaPhoneImage,
    ...rest,
  });
}

function ImageComponent({
  windowSize,
  bigImage,
  phoneImage,
}: ImageComponentProps) {
  const imageSource = React.useMemo(() => {
    if (windowSize.width >= 768) {
      return bigImage;
    }
    return phoneImage;
  }, [windowSize.width]);
  const imageSize = React.useMemo(() => {
    if (windowSize.width >= 768) {
      const currentWidth = 180;
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
    <>
      <NextImage
        useSkeleton
        src={imageSource.src}
        width={imageSize.width}
        height={imageSize.height}
        alt="Balaji"
        className="absolute top-0 rotate-[-8deg] blur-[25px]"
      />
      <NextImage
        useSkeleton
        src={imageSource.src}
        width={imageSize.width}
        height={imageSize.height}
        alt="Balaji"
        className="rotate-[-8deg]"
      />
    </>
  );
}

function heightDependOnWidth(width: number) {
  return Math.floor((width * 4) / 3);
}
