"use client";
import wording from "@/constant/wording";
import { atom, useAtom } from "jotai";
import { Variant } from "@/types/variant";
const qtyId = wording.form.QTY.toLowerCase();
export const selectedVariantAtom = atom<Variant>("nachos");
