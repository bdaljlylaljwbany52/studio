import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {cn} from '@/lib/utils';
import {Toaster} from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar'; // Adjusted import path
import AppSidebar from '@/components/app-sidebar'; // Assuming AppSidebar component exists

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BizFlow - Small Business ERP',
  description: 'Manage your revenue, expenses, and appointments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'antialiased font-sans flex min-h-screen'
        )}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
