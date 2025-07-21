"use client";
import { useState } from "react";
import LoadingScreen from "./loading-screen";
import BootstrapClient from "@/components/bootstrap-js";

const Root = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [display, setDisplay] = useState(false);

  return (
    <main style={{ minHeight: "100vh" }}>
      {children}
      <LoadingScreen display={display} />
      <BootstrapClient />
    </main>
  );
};

export default Root;
