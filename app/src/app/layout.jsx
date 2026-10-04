import './globals.css';
import CuentaProvider from './CuentaProvider';

export const metadata = {
  title: 'Garante',
  description: 'Tu palabra ahora tiene historial.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CuentaProvider>{children}</CuentaProvider>
      </body>
    </html>
  );
}
