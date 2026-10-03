import './globals.css';

export const metadata = {
  title: 'Garante',
  description: 'Tu palabra ahora tiene historial.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
