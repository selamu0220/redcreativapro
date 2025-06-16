import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import './globals.css';
import './styles/themes.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Red Creativa Pro - Plataforma Integral para Creativos y Marketing Digital',
  description: 'Herramientas profesionales para creativos: blog de marketing digital, recursos, calendario editorial, prompts de IA, miniaturas y gestión de proyectos creativos.',
  keywords: 'marketing digital, creativos, blog marketing, recursos creativos, calendario editorial, prompts IA, diseño miniaturas, gestión proyectos, contenido digital, SEO, redes sociales',
  authors: [{ name: 'Red Creativa Pro' }],
  openGraph: {
    title: 'Red Creativa Pro - Plataforma Integral para Creativos',
    description: 'Herramientas profesionales para creativos: blog de marketing digital, recursos, calendario editorial y gestión de proyectos.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Red Creativa Pro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
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