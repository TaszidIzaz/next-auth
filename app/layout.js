import './globals.css'
import { Inter } from "next/font/google";

import { Header } from "@/components/header";

const Font = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Font.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
