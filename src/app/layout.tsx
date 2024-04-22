import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import SecondaryHeader from './components/SecondaryHeader';
import { AppWrapper } from './context';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Platter',
  description: 'Platter technical challenge 24',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Suspense>
          <SecondaryHeader />
        </Suspense>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
