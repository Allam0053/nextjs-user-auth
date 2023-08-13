"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import LoadingPage from "@/components/layout/Loading";
import { User } from "./useUserColumns";

// import API_ENDPOINT from '@/services/endpoint/api-endpoint';

type StatusType = "authorized" | "unauthorized" | "loading";

export const ACCESS_TOKEN_KEY = "next-authentication";

export const STATUS = {
  authorized: "authorized" as const,
  unauthorized: "unauthorized" as const,
  loading: "loading" as const,
};

type AuthContextType = {
  token?: string;
  email?: string;
  user?: User;
  status: StatusType;
};
type LoginPayload = {
  token?: string;
  email?: string;
  user?: User;
};
type UpdateTokenPayload = {
  token?: string;
};
type AuthDispatchContextType = React.Dispatch<AuthActionType>;

type AuthActionType =
  | { type: "LOGIN"; payload: LoginPayload } // for login purpose
  | { type: "LOGOUT" }
  | { type: "POPULATE"; payload: AuthContextType } // for modifying the state freely
  | { type: "UPDATE_TOKEN"; payload: UpdateTokenPayload } // for refreshing purpose
  | { type: "START_LOADING" }
  | { type: "SET_STATUS"; payload: StatusType }
  | { type: "SAVE_AUTH" }
  | { type: "LOAD_AUTH" }
  | { type: "CLEAR_AUTH" };

const initial_value: AuthContextType = {
  status: "loading",
  token: "",
  email: "",
  user: {},
};

function reducer(state: AuthContextType, action: AuthActionType) {
  switch (action.type) {
    case "LOGIN": {
      // localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(state));
      Cookies.set("auth", "true");
      return {
        ...state,
        ...action.payload,
        status: "authorized",
        token: action.payload.token,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      Cookies.remove("auth");
      return {
        ...state,
        status: STATUS.unauthorized,
        token: "",
      };
    }
    case "POPULATE":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };
    case "START_LOADING": {
      Cookies.remove("auth");
      return {
        ...state,
        status: "loading",
      };
    }
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "SAVE_AUTH":
      localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(state));
      return {
        ...state,
      };
    case "LOAD_AUTH": {
      const currentUserDataJSON = localStorage.getItem(ACCESS_TOKEN_KEY);
      const currentUserData = JSON.parse(
        currentUserDataJSON || JSON.stringify(initial_value)
      );
      return {
        ...state,
        ...currentUserData,
      };
    }
    case "CLEAR_AUTH":
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      return {
        ...state,
      };
    default:
      throw new Error("Unknown action type");
  }
}

const AuthContext = createContext({
  status: "loading",
  token: "",
} as AuthContextType);
const AuthDispatchContext = createContext<AuthDispatchContextType>(() => {
  return;
});

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, initial_value);

  // const Component = children.type as ComponentWithAuth;

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        <MiddlewareAuth>{children}</MiddlewareAuth>
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

/**
 * add middleware check recursively
 * @param param0
 * @returns
 */
function MiddlewareAuth({ children }: { children: JSX.Element }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { token, status } = useAuth();
  const dispatch = useAuthDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // const tokenRefresher = useFetchRefreshToken();
  const requestInterceptorInstaller = useAuthRequestInterceptor();
  const responseInterceptorInstaller = useAuthResponseInterceptor();

  useEffect(() => {
    const currentUserData = getLocalStorageAccessToken();

    if (status === STATUS.authorized) return;
    // if already have access token, then log the user in
    if (
      currentUserData &&
      currentUserData.token &&
      currentUserData.token != ""
    ) {
      initial_value.status = STATUS.authorized;
      initial_value.token = currentUserData.token;
      dispatch({
        type: "LOGIN",
        payload: {
          token: currentUserData.token,
        },
      });
      // router.push('/dashboard');
      return; // terminate
    }

    // if dont have access token
    dispatch({
      type: "SET_STATUS",
      payload: STATUS.unauthorized,
    });
  }, []);

  useEffect(() => {
    // console.log('interceptor installed');
    requestInterceptorInstaller();
    responseInterceptorInstaller();
  }, [token, requestInterceptorInstaller, responseInterceptorInstaller]);

  return React.useMemo(() => {
    if (typeof window === "undefined" || status === "loading") {
      // console.log('1');
      return <LoadingPage isLoading />;
    }

    if (pathname === "/components") {
      // console.log('2');
      return children;
    }

    // if (status === STATUS.authorized && pathname === "/") {
    //   router.push("/users");
    // }

    if (status === STATUS.unauthorized && pathname !== "/") {
      // console.log('3');
      router.push("/");
      return <LoadingPage isLoading />;
    }

    // if (status === STATUS.authorized && pathname === "/") {
    //   // console.log('4');
    //   router.push("/users");
    //   return <LoadingPage isLoading />;
    // }

    // console.log('5');
    return children;
  }, [children, router, status]);
}

export function useAuthRequestInterceptor() {
  return React.useCallback(() => {
    return axios.interceptors.request.use(
      (config) => {
        if (config.url?.includes("login")) return config;
        if (config.url?.includes("refresh")) {
          // const token = localStorage.getItem("token");
          const historyLogin = getLocalStorageAccessToken();
          const token = historyLogin.token;
          config.headers.Authorization = token ? `Bearer ${token}` : "";
          return config;
        }
        // const token = localStorage.getItem("token");
        const historyLogin = getLocalStorageAccessToken();
        const token = historyLogin.token;
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);
}

export function useAuthResponseInterceptor() {
  const refresher = useFetchRefreshToken();
  return React.useCallback(() => {
    return axios.interceptors.response.use(
      (res) => {
        // console.log('res', res);
        return res;
      },
      async (err) => {
        // console.log('err', err);
        const originalConfig = err.config;
        // console.log(err.config);

        if (
          originalConfig.url.includes("refresh") &&
          err.response.status === 401
        ) {
          return Promise.reject(new Error("failed to fetch refresh token")); // stop refreshing if a refresh failed
        }
        if (err.response.status === 401) {
          refresher();
          return Promise.reject(new Error("try to fetch refresh token"));
        }
        // if (
        //   originalConfig.url !== `${API_ENDPOINT.URL_LOGIN}` &&
        //   err.response
        // ) {
        //   // Access Token expired
        //   if (err.response.status === 401 && !originalConfig._retry) {
        //     originalConfig._retry = true;

        //     return await refresher();

        //     // const apiResponse = await axios.post(`${API_ENDPOINT.URL_REFRESH}`, {
        //     //   headers: {
        //     //     Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     //   },
        //     // });

        //     // localStorage.setItem(
        //     //   'token',
        //     //   apiResponse.data.data.token
        //     // );
        //     // localStorage.setItem(
        //     // );
        //   }
        // }

        return Promise.reject(err);
      }
    );
  }, [refresher]);
}

/**
 * becareful declaring function with
 * - localStorage
 * - window
 * - (other built-in js object)
 *
 * it may cause error on server side rendering
 */
function getLocalStorageAccessToken() {
  if (typeof localStorage === "undefined")
    return {
      token: "",
      status: STATUS.unauthorized,
    };
  const currentUserDataJSON = localStorage.getItem(ACCESS_TOKEN_KEY);
  const currentUserData = JSON.parse(
    currentUserDataJSON as string
  ) as AuthContextType;
  if (!currentUserData)
    return {
      token: "",
      status: STATUS.unauthorized,
    };
  if (!currentUserData.token) currentUserData.token = "";
  if (!currentUserData.status) currentUserData.status = STATUS.unauthorized;
  return currentUserData;
}

export function useFetchRefreshToken() {
  return () => {}; // refresh token disabled
}
