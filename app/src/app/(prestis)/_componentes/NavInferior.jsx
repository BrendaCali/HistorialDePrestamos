'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icono from './Icono';

// "Mis Tratos" aún no tiene diseño en Stitch; queda deshabilitado hasta que exista.
const SECCIONES = [
  { href: '/tablon', icono: 'dashboard', texto: 'Tablón' },
  { href: null, icono: 'handshake', texto: 'Mis Tratos' },
  { href: '/mi-codigo', icono: 'qr_code_scanner', texto: 'Mi Código' },
  { href: '/reputacion', icono: 'verified', texto: 'Reputación' },
];

export default function NavInferior() {
  const ruta = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 mx-auto max-w-md z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-around h-16 px-space-xs">
        {SECCIONES.map(({ href, icono, texto }) => {
          const activo = href && ruta.startsWith(href);
          const contenido = (
            <>
              <div className={`w-10 h-7 rounded-full flex items-center justify-center transition-colors ${activo ? 'bg-secondary-container/50' : ''}`}>
                <Icono nombre={icono} tam={20} relleno={activo} />
              </div>
              <span className="font-label-sm text-label-sm mt-0.5">{texto}</span>
            </>
          );
          const base = 'flex flex-col items-center justify-center flex-1 h-full min-w-[44px] min-h-[44px] transition-colors';

          if (!href) {
            return (
              <span key={texto} aria-disabled="true" title="Próximamente" className={`${base} text-on-surface-variant/40`}>
                {contenido}
              </span>
            );
          }
          return (
            <Link key={texto} href={href} aria-current={activo ? 'page' : undefined}
              className={`${base} ${activo ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
              {contenido}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
