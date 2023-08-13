import Head from "next/head";
import * as React from "react";

import ArrowLink from "@/components/links/ArrowLink";
import ButtonLink from "@/components/links/ButtonLink";
import UnderlineLink from "@/components/links/UnderlineLink";
import UnstyledLink from "@/components/links/UnstyledLink";
import { InView } from "react-intersection-observer";

import { cn as clsxm } from "@/lib/utils";

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from "~/svg/Logo.svg";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";
import HomeSectionSearchWrapper from "@/components/layout/HomeSectionSearchWrapper";
import useSearchBar from "@/hooks/useSearchBar/master";
import HomeSectionIngredient from "@/components/layout/HomeSectionIngredient";
import Typography from "@/components/Typography";
import LayoutFooter from "@/components/layout/LayoutFooter";
import axios from "axios";
import { useAuth, useAuthDispatch } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { AuthResponse } from "@/types/auth";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/buttons/Button";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import API_ENDPOINT from "@/services/api-endpoint";
import RegisterModal from "./RegisterModal";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatchAuth = useAuthDispatch();
  // const [values, setValues] = useState({
  //   username: props.username,
  //   password: props.password,
  // });
  const methods = useForm({
    mode: "onTouched",
  });
  const { handleSubmit } = methods;
  // const [api, contextHolder] = notification.useNotification();

  const onSubmit = React.useCallback(
    async (data: FieldValues) => {
      const toastId = toast.loading("Sending File...");
      setIsLoading(true);
      await axios
        .post<AuthResponse>(API_ENDPOINT.URL_LOGIN, {
          email: data.email,
          password: data.password,
        })
        .then(({ data: responseData }) => {
          toast.remove(toastId);
          toast.success("Signed In");
          dispatchAuth({
            type: "LOGIN",
            payload: {
              token: responseData.token,
              email: data.email,
              user: {
                email: data.email,
              },
            },
          });
          dispatchAuth({
            type: "SAVE_AUTH",
          });
          // localStorage.setItem('access_token', data.data.access_token);
          // localStorage.setItem('refresh_token', data.data.refresh_token);
          // Cookies.set('auth', 'true');
          router.push("/users");
        })
        .catch((err) => {
          toast.remove(toastId);
          toast.error(err.message);
        })
        .finally(() => setIsLoading(false));
      return;
    },
    [dispatchAuth, router]
  );

  return (
    <FormProvider {...methods}>
      <Toaster
        containerStyle={{
          top: 84,
          left: 20,
          bottom: 20,
          right: 20,
        }}
      />
      <form
        className="z-10 space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="email"
          label="Email"
          validation={{ required: "email tidak boleh kosong" }}
          placeholder="name@email.com"
        />

        <PasswordInput
          id="password"
          label="Password"
          validation={{
            required: "password tidak boleh kosong",
          }}
          placeholder="Password"
        />

        <Button
          isLoading={isLoading}
          className="w-full justify-center text-center"
          type="submit"
        >
          Masuk
        </Button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <RegisterModal />
        </div>
      </form>
    </FormProvider>
  );
}
