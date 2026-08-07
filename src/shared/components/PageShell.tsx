import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollPag from "./ScrollPag";
import WhatsAppButton from "./WhatsAppButton";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  return (
    <div>
      <WhatsAppButton />
      <ScrollPag />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
