import './globals.css';
import CuentaProvider from './CuentaProvider';

export const metadata = {
  title: 'Preste',
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
