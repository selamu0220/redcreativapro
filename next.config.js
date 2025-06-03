/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // Configuración para trabajar con Netlify
  trailingSlash: true,
  // Configuración para optimización
  compiler: {
    // Elimina los console.log en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;