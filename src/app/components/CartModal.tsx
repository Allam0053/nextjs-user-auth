import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { cloneDeep, get } from "lodash";
import React, { useContext } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { FiCheckCircle, FiPlus, FiXCircle } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";

import { defaultValueForm } from "@/lib/data-converter";
import { handleChangeFocusTextInputCallback } from "@/lib/navigator";
import { createStateContext } from "@/hooks/useGlobalReducer";
import { ModalActionType, ModalContextType, reducer } from "@/hooks/useModal";

// import {cn as clsxm} from '@/lib/utils'
import Button from "@/components/buttons/Button";
import {
  DialogAction,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import ModalInput from "@/components/forms/ModalInput";

import API_ENDPOINT from "@/services/api-endpoint";
import { cartItemsAtom, cartOpenAtom, errorsAtom } from "./Atom";
import { useAtom } from "jotai";
import NextImage from "@/components/NextImage";

export const {
  Context: ModalContext,
  DispatchContext: ModalDispatchContext,
  StateProvider: ModalStateProvider,
} = createStateContext<ModalContextType, ModalActionType>(reducer, {
  status: "closed",
});
export const useModalState = () => useContext(ModalContext);
export const useModalDispatch = () => useContext(ModalDispatchContext);

export default function RegisterModal() {
  const methods = useForm({
    mode: "all",
  });

  return (
    <ModalStateProvider>
      <FormProvider {...methods}>
        <ModalStateConsumer />
      </FormProvider>
    </ModalStateProvider>
  );
}

function ModalStateConsumer() {
  const modalState = useModalState();
  const [modalOpen, setModalOpen] = useAtom(cartOpenAtom);
  const dispatch = useModalDispatch();
  const openModal = React.useCallback(
    () => dispatch({ type: "OPEN" }),
    [dispatch]
  );
  const toggleModal = React.useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        dispatch({ type: "CLOSE" });
        setModalOpen("closed");
        return;
      }
      setModalOpen("main");
      return;
    },
    [dispatch]
  );

  return (
    <>
      <DialogRoot
        open={
          !(
            modalOpen === "closed" ||
            (modalOpen as unknown as boolean) === false
          )
        }
        onOpenChange={toggleModal}
      >
        <DialogContent className="z-[60]" overlayClassName="z-[59]">
          {modalOpen === "main" && <MainModalContent />}
          {modalOpen === "confirm" && <ConfirmModalContent />}
          {modalOpen === "confirmed" && <ConfirmedModalContent />}
          {modalOpen === "failed" && <FailedModalContent />}
        </DialogContent>
      </DialogRoot>
    </>
  );
}

export function MainModalContent() {
  //#region  //*=========== Modal ===========
  // const dispatch = useModalDispatch();
  const [modalOpen, dispatch] = useAtom(cartOpenAtom);
  const closeModal = React.useCallback(() => dispatch("closed"), [dispatch]);
  const nextStep = React.useCallback(() => dispatch("confirm"), [dispatch]);
  //#endregion  //*======== Modal ===========
  const handleChangeFocusTextInput = React.useCallback(
    handleChangeFocusTextInputCallback,
    []
  );

  // const requiredFieldIds = ["email", "password"];
  // const { formState, watch } = useFormContext();
  // const requiredFieldValues = watch(requiredFieldIds);
  const isPermittedContinue = React.useMemo(() => {
    return true;
  }, []);

  const [products, setProducts] = useAtom(cartItemsAtom);

  return (
    <>
      <DialogTitle>Item Baru</DialogTitle>
      <DialogDescription>Masukkan User Baru</DialogDescription>
      <form className="flex w-full flex-col">
        <div className="mb-8 flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {products.map((product, index) => (
              <li key={product.id} className="flex py-6">
                <div className="flex h-24 w-24 flex-shrink-0 justify-center overflow-hidden rounded-md border border-gray-200">
                  <NextImage
                    useSkeleton
                    src={product.imageSource.src}
                    width={72}
                    height={96}
                    alt={product.variant}
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">{product.variant}</a>
                      </h3>
                      <p className="ml-4">{product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.count}</p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => {
                          const newProducts = cloneDeep(
                            products.filter(
                              (val, indexIter) => indexIter === index
                            )
                          );
                          setProducts(newProducts);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>
              {products.reduce(
                (prev, curr) =>
                  get(curr, "price", 0) * get(curr, "count", 0) + prev,
                0
              )}
            </p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
        </div>
      </form>
      <DialogAction>
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          disabled={!isPermittedContinue}
          variant={isPermittedContinue ? "primary" : "outline"}
          onClick={nextStep}
        >
          Buy
        </Button>
      </DialogAction>
    </>
  );
}

export function ConfirmModalContent() {
  // const dispatch = useModalDispatch();
  const [modalOpen, dispatch] = useAtom(cartOpenAtom);
  const [cartItems] = useAtom(cartItemsAtom);
  const [, setErrors] = useAtom(errorsAtom);
  const prevModal = React.useCallback(() => dispatch("main"), [dispatch]);

  const queryClient = useQueryClient();
  const { handleSubmit } = useFormContext();
  const onSubmit = React.useCallback<SubmitHandler<FieldValues>>(
    async (entriedData: FieldValues) => {
      const data = defaultValueForm(entriedData);
      // console.log('data submitted', data);
      return await axios
        .post("/api/checkout", {
          data: cartItems.map((cartItem) => ({
            item_name: cartItem.variant,
            item_count: cartItem.count,
          })),
        })
        .then((res) => {
          dispatch("confirmed");
          return res.data;
        })
        .catch((err) => {
          setErrors({
            failedMessage: "Gagal Beli",
            failedCode: 500,
            failedErrors: ["Cek Internet", "Kesalaha Server"],
          });
          dispatch("failed");
          // console.log(err);
        });
    },
    [dispatch, queryClient]
  );

  const nextModal = React.useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);
  return (
    <>
      <DialogTitle>Konfirmasi User Baru</DialogTitle>
      <DialogDescription>Yakin menambahkan data?</DialogDescription>
      <DialogAction>
        <Button variant="outline" onClick={prevModal}>
          Cek Kembali
        </Button>
        <Button onClick={nextModal} type="submit">
          Simpan
        </Button>
      </DialogAction>
    </>
  );
}

export function ConfirmedModalContent() {
  // const dispatch = useModalDispatch();
  const [, dispatch] = useAtom(cartOpenAtom);
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const { reset } = useFormContext();
  const inputLagi = React.useCallback(() => {
    reset();

    dispatch("main");
    setCartItems([]);
  }, [dispatch, reset]);
  const sampun = React.useCallback(() => {
    reset();
    dispatch("closed");
    setCartItems([]);
  }, [dispatch, reset]);
  return (
    <>
      <DialogTitle className="flex items-center">
        <FiCheckCircle className="mr-2 inline-block h-6 w-6 fill-white stroke-emerald-500" />
        Berhasil Beli
      </DialogTitle>
      <DialogDescription>
        Berhasil Membeli{" "}
        {cartItems.reduce((prev, curr) => get(curr, "count", 0) + prev, 0)}{" "}
        items
      </DialogDescription>
      <DialogAction>
        <Button variant="outline" onClick={sampun}>
          Selesai
        </Button>
        <Button onClick={inputLagi}>Input Lagi</Button>
      </DialogAction>
    </>
  );
}

// failed modal
export function FailedModalContent() {
  const [{ failedMessage, failedCode, failedErrors }] = useAtom(errorsAtom);
  // const dispatch = useModalDispatch();
  const [, dispatch] = useAtom(cartOpenAtom);
  const inputLagi = React.useCallback(() => dispatch("main"), [dispatch]);
  const sampun = React.useCallback(() => dispatch("closed"), [dispatch]);
  return (
    <>
      <DialogTitle className="flex items-center">
        <FiXCircle className="mr-2 inline-block h-6 w-6 fill-white stroke-red-500" />
        {failedCode} Data Gagal Disimpan
      </DialogTitle>
      <DialogDescription>
        Data user telah gagal disimpan <p>{failedMessage}</p>
        {failedErrors &&
          failedErrors.length > 0 &&
          failedErrors.map((message, index) => (
            <li key={`error-message-${index}`}>{message}</li>
          ))}
      </DialogDescription>
      <DialogAction>
        <Button variant="outline" onClick={sampun}>
          Selesai
        </Button>
        <Button onClick={inputLagi}>Cek Kembali</Button>
      </DialogAction>
    </>
  );
}
