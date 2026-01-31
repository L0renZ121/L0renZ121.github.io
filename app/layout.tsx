import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Abhi Khatiwada — Front-End Designer',
  description: 'Bold, responsive digital experiences crafted with meticulous attention to detail.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-white font-display">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
