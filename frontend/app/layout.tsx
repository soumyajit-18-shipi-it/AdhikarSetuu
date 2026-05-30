import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ProfileProvider } from '@/hooks/useProfile';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Adhikar Setu — Government Benefits for MSMEs',
  description: 'AI-powered incentive discovery and compliance intelligence for MSMEs in India.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
        <body className={`${inter.className} min-h-screen bg-white`}>
          <ProfileProvider>{children}</ProfileProvider>
        </body>
      </html>
  );
}
