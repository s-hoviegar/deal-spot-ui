import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, CssBaseline } from "@mui/material";
import "./globals.css";
import Header from "./header/header";
import Providers from "./providers";
import authenticated from "./auth/authenticated";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deal Spot",
  description: "Find best discounts and deals online",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await authenticated();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers authenticated={isAuthenticated}>
          <CssBaseline />
          <Header />
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
