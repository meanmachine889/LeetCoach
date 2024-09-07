"use client";   

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {
  wrappedComponent: React.ComponentType<any>;
};

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithAuth = (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/signin");
      }
    }, [status, router]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName =
    `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithAuth;
};

export default withAuth;
