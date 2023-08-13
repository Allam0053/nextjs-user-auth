"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

import { useAuth, useAuthDispatch } from "@/hooks/useAuth";

import Seo from "@/components/Seo";
import Layout from "@/components/layout/Layout";

export default function Logout() {
  // const { auth, setAuth } = useContext(AuthContext);
  const [_, forceRerender] = useState(0);
  const auth = useAuth();
  const dispatchAuth = useAuthDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("logout")) {
      dispatchAuth({ type: "LOGOUT" });
      router.push("/auth/login");
      forceRerender(1);
    }
  }, [auth, dispatchAuth, router]);

  return (
    <Layout>
      <section className="flex h-full w-full flex-col gap-4 overflow-auto rounded-lg">
        <div className="layout flex min-h-screen flex-col items-center justify-center">
          <ImSpinner2 className="h-12 w-12 animate-spin" />
          {"Loading "}
        </div>
      </section>
    </Layout>
  );
}
