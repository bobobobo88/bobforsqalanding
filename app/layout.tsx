import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ScanlineEffect } from '@/components/effects/ScanlineEffect';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bob Forsqa | Cybercriminal Extraordinaire',
  description: 'The syndicate dashboard of Bob Forsqa, fictional cybercriminal mastermind.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ScanlineEffect />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}