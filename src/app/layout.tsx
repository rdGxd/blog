import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The blog - Este é um blog de exemplo",
  description: "Este é um blog de exemplo criado com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
