import '@/app/ui/globals.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Inter } from "next/font/google";
import NavBar from './ui/nav-bar';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <NavBar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
