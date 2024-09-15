import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, CssBaseline } from "@mui/material";
import "./globals.css";
import Header from "./header/header";
import Providers from "./providers";
import authenticated from "./auth/authenticated";
import logout from "./auth/logout";

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
  const isAuthenticated = authenticated();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers authenticated={isAuthenticated}>
          <CssBaseline />
          <Header logout={logout} />
          <Container className={isAuthenticated ? "mt-20" : ""}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
