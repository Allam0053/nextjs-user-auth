import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { get } from "lodash";
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
  const dispatch = useModalDispatch();
  const openModal = React.useCallback(
    () => dispatch({ type: "OPEN" }),
    [dispatch]
  );
  const toggleModal = React.useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        dispatch({ type: "CLOSE" });
        return;
      }
    },
    [dispatch]
  );

  return (
    <>
      <DialogRoot
        open={modalState?.status !== "closed"}
        onOpenChange={toggleModal}
      >
        <DialogTrigger asChild>
          <Button variant="outline" size="xs" onClick={openModal}>
            Create account
          </Button>
        </DialogTrigger>
        <DialogContent className="z-20">
          {modalState?.status === "main" && <MainModalContent />}
          {modalState?.status === "confirm" && <ConfirmModalContent />}
          {modalState?.status === "confirmed" && <ConfirmedModalContent />}
          {modalState?.status === "failed" && <FailedModalContent />}
        </DialogContent>
      </DialogRoot>
    </>
  );
}

export function MainModalContent() {
  //#region  //*=========== Modal ===========
  const dispatch = useModalDispatch();
  const closeModal = React.useCallback(
    () => dispatch({ type: "CLOSE" }),
    [dispatch]
  );
  const nextStep = React.useCallback(
    () => dispatch({ type: "NEXT" }),
    [dispatch]
  );
  //#endregion  //*======== Modal ===========
  const handleChangeFocusTextInput = React.useCallback(
    handleChangeFocusTextInputCallback,
    []
  );

  const requiredFieldIds = ["name", "username", "password"];
  const { formState, watch } = useFormContext();
  const requiredFieldValues = watch(requiredFieldIds);
  const isPermittedContinue = React.useMemo(() => {
    // console.log({ requiredFieldValues });
    if (
      requiredFieldValues.some((value) => value === "" || value === undefined)
    ) {
      return false;
    }
    if (Object.keys(formState.errors).length > 0) {
      return false;
    }
    return true;
  }, [formState.errors, requiredFieldValues]);

  return (
    <>
      <DialogTitle>User Baru</DialogTitle>
      <DialogDescription>Masukkan User Baru</DialogDescription>
      <form className="flex w-full flex-col">
        <ModalInput
          id="email"
          label={
            <>
              Email
              <span className="pl-2 text-red-500">*</span>
            </>
          }
          validation={{ required: "Email tidak boleh kosong" }}
          placeholder="name@email.com"
          helperText="Email User"
          onKeyDown={handleChangeFocusTextInput}
        />

        <ModalInput
          id="password"
          type="password"
          label={
            <>
              Password
              <span className="pl-2 text-red-500">*</span>
            </>
          }
          validation={{ required: "Password tidak boleh kosong" }}
          onKeyDown={handleChangeFocusTextInput}
        />
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
          Save
        </Button>
      </DialogAction>
    </>
  );
}

export function ConfirmModalContent() {
  const dispatch = useModalDispatch();
  const prevModal = React.useCallback(
    () => dispatch({ type: "PREV" }),
    [dispatch]
  );

  const queryClient = useQueryClient();
  const { handleSubmit } = useFormContext();
  const onSubmit = React.useCallback<SubmitHandler<FieldValues>>(
    async (entriedData: FieldValues) => {
      const data = defaultValueForm(entriedData);
      // console.log('data submitted', data);
      return await axios
        .post(API_ENDPOINT.URL_USER_REGISTER, data)
        .then((res) => {
          dispatch({ type: "NEXT" });
          return res.data;
        })
        .catch((err) => {
          dispatch({
            type: "FAILED",
            payload: {
              failedMessage: get(err, "response.data.message", ""),
              failedCode: get(err, "response.data.code", ""),
              failedErrors: get(err, "response.data.errors", []),
            },
          });
          // console.log(err);
        })
        .finally(() => {
          queryClient.refetchQueries({
            queryKey: ["users"],
            type: "active",
          });
          queryClient.refetchQueries({
            queryKey: ["/users"],
            type: "active",
          });
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
  const dispatch = useModalDispatch();
  const { reset } = useFormContext();
  const inputLagi = React.useCallback(() => {
    reset();
    dispatch({ type: "OPEN" });
  }, [dispatch, reset]);
  const sampun = React.useCallback(() => {
    reset();
    dispatch({ type: "CLOSE" });
  }, [dispatch, reset]);
  return (
    <>
      <DialogTitle className="flex items-center">
        <FiCheckCircle className="mr-2 inline-block h-6 w-6 fill-white stroke-emerald-500" />
        Data Berhasil Disimpan
      </DialogTitle>
      <DialogDescription>Data user telah berhasil disimpan</DialogDescription>
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
  const { failedMessage, failedCode, failedErrors } =
    useModalState() as ModalContextType;
  const dispatch = useModalDispatch();
  const inputLagi = React.useCallback(
    () => dispatch({ type: "OPEN" }),
    [dispatch]
  );
  const sampun = React.useCallback(
    () => dispatch({ type: "CLOSE" }),
    [dispatch]
  );
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
