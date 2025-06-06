import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import './globals.css';
import './styles/themes.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Red Creativa Pro Beta',
  description: 'Plataforma integral para creativos y profesionales - Versión Beta',
  keywords: 'creatividad, productividad, blog, recursos, proyectos',
  authors: [{ name: 'Red Creativa Pro Beta' }],
  openGraph: {
    title: 'Red Creativa Pro Beta',
    description: 'Plataforma integral para creativos y profesionales - Versión Beta',
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
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}