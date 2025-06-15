import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";

const dm_sans = DM_Sans({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Oily",
  description: "Predict the future Oil Price on your Gasstation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dm_sans.className} antialiased`}
      >
        <LoadingProvider>
          <LoadingOverlay/>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
