"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

import { useAuth, useAuthDispatch } from "@/hooks/useAuth";

import Seo from "@/components/Seo";
import Layout from "@/components/layout/Layout";
import TanStackReactQueryProveider from "@/components/providers/ReactQuery";

export default function Logout() {
  // const { auth, setAuth } = useContext(AuthContext);
  const [rerenderQuota, forceRerender] = useState(5);
  const auth = useAuth();
  const dispatchAuth = useAuthDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    dispatchAuth({ type: "LOGOUT" });
    dispatchAuth({ type: "CLEAR_AUTH" });
    return () => router.push("/");
  }, [auth, dispatchAuth, router]);

  return (
    <TanStackReactQueryProveider>
      <Layout>
        <section className="flex h-full w-full flex-col gap-4 overflow-auto rounded-lg">
          <div className="layout flex min-h-screen flex-col items-center justify-center">
            <ImSpinner2 className="h-12 w-12 animate-spin" />
            {"Loading "}
            {auth.status}
          </div>
        </section>
      </Layout>
    </TanStackReactQueryProveider>
  );
}
