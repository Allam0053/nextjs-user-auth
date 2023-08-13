"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQueryClient } from "@tanstack/react-query";
import { ImInfo } from "react-icons/im";
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
import { useAuth, useAuthDispatch } from "@/hooks/useAuth";
import Typography from "../Typography";
import ButtonLink from "../links/ButtonLink";
import { useRouter } from "next/navigation";

export const {
  Context: ModalContext,
  DispatchContext: ModalDispatchContext,
  StateProvider: ModalStateProvider,
} = createStateContext<ModalContextType, ModalActionType>(reducer, {
  status: "closed",
});
export const useModalState = () => useContext(ModalContext);
export const useModalDispatch = () => useContext(ModalDispatchContext);

export default function UserInfoModal() {
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
          <Button leftIcon={ImInfo} size="xs" onClick={openModal}>
            Info User
          </Button>
        </DialogTrigger>
        <DialogContent className="z-[60]" overlayClassName="z-[59]">
          {modalState?.status === "main" && <MainModalContent />}
          {modalState?.status === "confirm" && <ConfirmModalContent />}
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

  const { user, token, email } = useAuth();

  return (
    <>
      <div className="flex flex-col items-center gap-1 space-x-6">
        <Typography as="label" variant="h2" className="mb-4 block">
          Detail Logged In
        </Typography>
        {get(user, "avatar") && (
          <img
            className="mb-2 max-w-[120px] rounded-full"
            src={get(user, "avatar", "")}
            alt={get(user, "first_name", "")}
          />
        )}
        <div className="grid w-full grid-cols-2">
          <Typography as="label" variant="s3" className="block font-bold">
            token
          </Typography>
          <Typography as="label" variant="h6" className="block font-medium">
            {token}
          </Typography>
          {email && (
            <>
              <Typography as="label" variant="s3" className="block font-bold">
                email
              </Typography>
              <Typography as="label" variant="h6" className="block font-medium">
                {email}
              </Typography>
            </>
          )}
        </div>

        {/* {user && (
          <Typography as="label" variant="h5" className="mb-4 block">
            User
          </Typography>
        )}
        {user &&
          Object.entries(user).map(([key, value], index) => (
            <div className="grid w-full grid-cols-2">
              <Typography as="label" variant="s3" className="block font-bold">
                {key}
              </Typography>
              <Typography as="label" variant="h6" className="block font-medium">
                {value}
              </Typography>
            </div>
          ))} */}
      </div>
      <DialogAction>
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={nextStep}>
          Log Out
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

  const router = useRouter();
  const dispatchAuth = useAuthDispatch();
  const logout = React.useCallback(() => {
    dispatchAuth({ type: "LOGOUT" });
    dispatchAuth({ type: "CLEAR_AUTH" });
    // router.push("/logout");
  }, [dispatchAuth, router, router.push]);
  return (
    <>
      <DialogTitle>Konfirmasi Logout</DialogTitle>
      <DialogDescription>Yakin Logout?</DialogDescription>
      <DialogAction>
        <Button variant="outline" onClick={prevModal}>
          Batal
        </Button>
        <Button onClick={logout} variant="danger">
          Log Out
        </Button>
      </DialogAction>
    </>
  );
}
