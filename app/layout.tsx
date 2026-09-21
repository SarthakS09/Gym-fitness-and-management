import type { Metadata } from 'next';
import './globals.css';
import { GymProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Titanium Fitness | Tiered Gym & Fitness Center Management System',
  description: 'A Tiered Gym and Fitness Center Management System with Role-Based Dashboards and Membership Automation. GLA University Mathura CSE Capstone.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@600;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-titanium-950 text-titanium-100 min-h-screen">
        <GymProvider>
          {children}
        </GymProvider>
      </body>
    </html>
  );
}
