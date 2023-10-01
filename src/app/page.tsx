"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Layout, { Section, ShadowedBox } from "@/components/layout/Layout";
import TanStackReactQueryProveider from "@/components/providers/ReactQuery";
import { useWindowSize } from "usehooks-ts";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";

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
import { AiFillStar } from "react-icons/ai";
import IconButton from "@/components/buttons/IconButton";
import {
  ChilliComponent,
  CornComponent,
  FireComponent,
} from "@/app/components/FlavorComponent";
import {
  ChaskaImageComponent,
  ChaskaOnDisplayImageComponent,
  CrunchexImageComponent,
  CrunchexOnDisplayImageComponent,
  NachosImageComponent,
  NachosOnDisplayImageComponent,
  TomatoImageComponent,
  TomatoOnDisplayImageComponent,
} from "@/app/components/ItemComponent";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import ImageChilli from "public/images/flavor/1.png";
import ImagePlane from "public/images/decoration/2.png";

type Variant = "nachos" | "crunchex" | "tomato" | "chaska";

const qtyId = wording.form.QTY.toLowerCase();
export const selectedVariantAtom = atom<Variant>("nachos");

export default function Page() {
  const windowSize = useWindowSize();
  const methods = useForm({
    mode: "onTouched",
  });
  const qtyWatch = methods.watch(qtyId);

  const [selectedVariant, setSelectedVariant] = useAtom(selectedVariantAtom);
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

  const itemOnDisplay = React.useMemo(() => {
    return [
      { variant: "nachos" as const, onClickFn: selectNachosFn },
      { variant: "crunchex" as const, onClickFn: selectCrunchexFn },
      { variant: "tomato" as const, onClickFn: selectTomatoFn },
      { variant: "chaska" as const, onClickFn: selectChaskaFn },
    ].filter((val) => val.variant !== selectedVariant);
  }, [selectedVariant]);

  const onAddToCart = React.useCallback(async () => {
    const dataToBeSend = {
      item_name: selectedVariant,
      item_count: qtyWatch ?? 0,
    };
    return await axios
      .post("/api/cart", dataToBeSend)
      .then((res) => {
        return res.data.message;
      })
      .then((message: string) => {
        toast.success(message);
      })
      .catch((err: Error) => {
        toast.error(err?.toString());
      });
  }, [selectedVariant, qtyWatch]);

  return (
    <Layout isHScreen>
      <Toaster />
      <div className="h-[48px] w-full lg:h-[60px]" />
      <Section
        className={cn(
          "w-full flex-col",
          "md:w-[75vw]",
          "lg:grid lg:w-[90vw] lg:grid-cols-2 lg:gap-4"
        )}
        id="main"
      >
        <div className="relative flex w-full flex-col items-center lg:h-full lg:items-start lg:justify-center">
          <Typography
            variant={windowSize.width > 768 ? "j1" : "h1"}
            className="text-center lg:hidden"
          >
            {wording[selectedVariant].TITLE}
          </Typography>
          <Typography
            variant={windowSize.width > 768 ? "xj3" : "h1"}
            className="hidden text-left lg:relative lg:block lg:text-left"
          >
            {wording[selectedVariant].TITLE_P1}
            <NextImage
              useSkeleton
              src={ImageChilli.src}
              width={160}
              height={160}
              alt="Chilli"
              className={cn(
                "absolute right-0 top-0 -translate-y-4 translate-x-20",
                "rotate-[-16deg]"
              )}
            />
          </Typography>
          <Typography
            variant={windowSize.width > 768 ? "xj3" : "h1"}
            className="hidden text-left lg:block lg:text-left"
          >
            {wording[selectedVariant].TITLE_P2}
          </Typography>
          <Typography
            variant={windowSize.width > 768 ? "s1" : "c2"}
            className="text-center font-normal text-slate-600 lg:text-left"
          >
            {wording[selectedVariant].DESCRIPTION}
          </Typography>
          {windowSize.width > 768 && (
            <>
              <br className="h-4" />
              <div className="flex w-full items-center justify-evenly">
                <Button
                  className="h-12 justify-between rounded-full"
                  leftNode={({ size }) => (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500">
                      <BsCartPlus
                        size="1em"
                        className={cn([
                          size === "base" && "md:text-md text-md",
                          size === "sm" && "md:text-md text-sm",
                          size === "xs" && "text-xs md:text-xs",
                        ])}
                      />
                    </div>
                  )}
                  rightIcon={" "}
                  variant="dark"
                  onClick={onAddToCart}
                >
                  {wording.form.SUBMIT.toUpperCase()}
                </Button>

                <div className="flex w-fit items-center gap-2">
                  <IconButton
                    icon={FiMinusCircle}
                    onClick={onMinusFn}
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    variant="light"
                    classNames={{ icon: "w-5 h-5" }}
                  />
                  <FormProvider {...methods}>
                    <Input
                      isText={false}
                      id={qtyId}
                      label={null}
                      placeholder="0"
                      className={cn(
                        "h-12 max-w-[60px] rounded-full text-right"
                      )}
                      onChange={onChange}
                    />
                  </FormProvider>

                  <IconButton
                    icon={FiPlusCircle}
                    onClick={onPlusFn}
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    variant="light"
                    classNames={{ icon: "w-5 h-5" }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="h-8 lg:hidden" />
        <div className="relative flex w-full justify-center">
          <NextImage
            useSkeleton
            src={ImagePlane.src}
            width={400}
            height={400}
            alt="Chilli"
            className={cn(
              "absolute left-0 top-0 -translate-x-[30%] -translate-y-[37%] scale-50 md:-translate-x-[25%] md:-translate-y-[20%] md:scale-75 lg:-translate-x-[45%] lg:scale-90 xl:-translate-x-[30%] xl:scale-100"
            )}
          />
          {selectedVariant === "crunchex" ? (
            <CrunchexImageComponent windowSize={windowSize} />
          ) : selectedVariant === "tomato" ? (
            <TomatoImageComponent windowSize={windowSize} />
          ) : selectedVariant === "chaska" ? (
            <ChaskaImageComponent windowSize={windowSize} />
          ) : (
            <NachosImageComponent windowSize={windowSize} />
          )}

          <div className="absolute right-0 top-[50%] flex -translate-y-1/2 flex-col gap-2">
            <ChilliComponent windowSize={windowSize} />
            <FireComponent windowSize={windowSize} />
            <CornComponent windowSize={windowSize} />
          </div>
        </div>
        <div className="h-8" />
      </Section>
      {windowSize.width <= 768 && (
        <Section
          className={cn(
            "w-full flex-1 flex-col rounded-t-lg bg-white",
            "md:w-[75vw]",
            "lg:hidden"
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
              onClick={onAddToCart}
            >
              {wording.form.SUBMIT}
            </Button>
          </form>
        </Section>
      )}
      {windowSize.width > 768 && (
        <Section
          className={cn(
            "w-full flex-1 rounded-t-lg bg-emerald-700",
            "md:w-[90vw]",
            "lg:w-[80vw]"
          )}
          id="menu"
        >
          <div className="grid h-full w-full grid-cols-3 gap-4">
            {itemOnDisplay.map((item) => (
              <ItemCardOnDisplay
                key={`item-card-on-display-${item}`}
                variant={item.variant}
                windowSize={windowSize}
                onClick={item.onClickFn}
              />
            ))}
          </div>
        </Section>
      )}
    </Layout>
  );
}

export const ItemCardOnDisplay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<"div"> & {
    variant: Variant;
    windowSize: WindowSize;
  }
>(({ children, className, variant, windowSize, ...rest }, forwardRef) => (
  <div
    className="flex h-full w-full flex-row-reverse items-center"
    ref={forwardRef}
    {...rest}
  >
    <div className="flex h-[80%] w-full -translate-x-2 flex-col justify-center gap-1 rounded-md bg-white pl-2">
      <Typography variant="h6">{wording[variant].TITLE}</Typography>
      <div className="flex gap-1">
        <AiFillStar className="h-4 w-4 text-amber-500" />
        <AiFillStar className="h-4 w-4 text-amber-500" />
        <AiFillStar className="h-4 w-4 text-amber-500" />
        <AiFillStar className="h-4 w-4 text-amber-500" />
        <AiFillStar className="h-4 w-4 text-amber-500" />
        <div className="w-2" />
        <Typography variant="h6" className="font-bold">
          ₹10
        </Typography>
      </div>
      <Button
        variant="primary-nachos"
        className="flex w-fit rounded-full text-black"
      >
        ORDER NOW
      </Button>
    </div>
    {variant === "crunchex" ? (
      <CrunchexOnDisplayImageComponent windowSize={windowSize} />
    ) : variant === "tomato" ? (
      <TomatoOnDisplayImageComponent windowSize={windowSize} />
    ) : variant === "chaska" ? (
      <ChaskaOnDisplayImageComponent windowSize={windowSize} />
    ) : (
      <NachosOnDisplayImageComponent windowSize={windowSize} />
    )}
  </div>
));
