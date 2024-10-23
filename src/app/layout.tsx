import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/assets/css/index.css";

const poopins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Catering App",
    default: "Catering App",
  },
  description: "Healty Foods, Asian Food & Instant Foods",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poopins.className}>
      <body>
        <main className="container max-w-sm mx-auto flex flex-col gap-y-5 relative pt-16">{children}</main>
        {modal}
      </body>
    </html>
  );
}
