import ClientTheme from "../context/ClientTheme";
import { ThemeProvider } from "../context/ThemeContext";
import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ClientTheme>
            <div className="max-w-full text-2xl mb-10">{children}</div>
          </ClientTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
