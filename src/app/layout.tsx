import Container from "@/components/Container";
import { Header } from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Blog - é um blog de exemplo",
    template: "%s | The Blog",
  },
  description: "Este é um blog de exemplo criado com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Container>
          <Header />
          {children}
          <footer className="text-center py-4">
            <p className="text-gray-500">© 2023 My Blog</p>
          </footer>
        </Container>
      </body>
    </html>
  );
}
