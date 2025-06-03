import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import '../src/index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Red Creativa Pro',
  description: 'Plataforma integral para creativos y profesionales',
  keywords: 'creatividad, productividad, blog, recursos, proyectos',
  authors: [{ name: 'Red Creativa Pro' }],
  openGraph: {
    title: 'Red Creativa Pro',
    description: 'Plataforma integral para creativos y profesionales',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}