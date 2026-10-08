'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCuenta } from '../../CuentaProvider';
import Icono from './Icono';

const SECCIONES = [
  { href: '/tablon', icono: 'dashboard', texto: 'Tablón' },
  { href: '/mis-tratos', icono: 'handshake', texto: 'Mis Tratos' },
  { href: '/mi-codigo', icono: 'qr_code_scanner', texto: 'Mi Código' },
  { href: '/reputacion', icono: 'verified', texto: 'Reputación' },
];

// Celular: barra inferior. Pantalla ancha: menú lateral.
export default function NavInferior() {
  const ruta = usePathname();
  const { direccion } = useCuenta();
  const activo = (href) => ruta.startsWith(href);

  return (
    <>
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-around h-16 px-space-xs max-w-md mx-auto">
          {SECCIONES.map(({ href, icono, texto }) => (
            <Link key={texto} href={href} aria-current={activo(href) ? 'page' : undefined}
              className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] min-h-[44px] transition-colors ${activo(href) ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
              <div className={`w-10 h-7 rounded-full flex items-center justify-center transition-colors ${activo(href) ? 'bg-secondary-container/50' : ''}`}>
                <Icono nombre={icono} tam={20} relleno={activo(href)} />
              </div>
              <span className="font-label-sm text-label-sm mt-0.5">{texto}</span>
            </Link>
          ))}
        </div>
      </nav>

      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 z-40 flex-col bg-surface-container-lowest border-r border-surface-variant/40 p-space-md">
        <Link href="/tablon" className="flex items-center gap-space-sm px-space-xs py-space-md">
          <img src="/img/logo-condor.png" alt="Preste" className="h-10 w-auto object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="font-headline-sm text-headline-sm text-on-surface">Preste</span>
            <span className="font-metric-mono text-label-sm text-secondary uppercase">Garante Protocol</span>
          </div>
        </Link>
        <nav className="flex flex-col gap-space-xs mt-space-sm">
          {SECCIONES.map(({ href, icono, texto }) => (
            <Link key={texto} href={href} aria-current={activo(href) ? 'page' : undefined}
              className={`h-12 px-space-md rounded-xl flex items-center gap-space-sm font-label-lg text-label-lg transition-colors ${activo(href) ? 'bg-secondary-container/50 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
              <Icono nombre={icono} tam={22} relleno={activo(href)} />
              {texto}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-xl bg-surface-container p-space-md">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Tu cuenta</span>
          {direccion ? (
            <span className="font-metric-mono text-label-md text-primary break-all">{direccion.slice(0, 8)}…{direccion.slice(-6)}</span>
          ) : (
            <Link href="/" className="font-label-md text-label-md text-primary hover:underline">Entrar con huella</Link>
          )}
        </div>
      </aside>
    </>
  );
}
