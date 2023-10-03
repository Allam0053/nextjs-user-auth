"use client";
import wording from "@/constant/wording";
import { atom, useAtom } from "jotai";
import { Variant } from "@/types/variant";
import { StaticImageData } from "next/image";
import { ModalStatusType } from "@/hooks/useModal";
const qtyId = wording.form.QTY.toLowerCase();
export const selectedVariantAtom = atom<Variant>("nachos");
export const cartOpenAtom = atom<boolean | ModalStatusType>(false);
export const cartItemsAtom = atom<
  {
    id: string;
    variant: Variant;
    count: number;
    price: number;
    imageSource: StaticImageData;
    color: string;
  }[]
>([]);
export const errorsAtom = atom<{
  failedCode?: number;
  failedMessage?: string;
  failedErrors?: string[];
}>({});
