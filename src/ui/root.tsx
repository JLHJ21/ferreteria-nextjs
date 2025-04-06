"use client";
import { useState } from "react";
import LoadingScreen from "./loading-screen";
import BootstrapClient from "@/components/bootstrap-js";
import Footer from "./footer";

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
      <Footer />
    </main>
  );
};

export default Root;
