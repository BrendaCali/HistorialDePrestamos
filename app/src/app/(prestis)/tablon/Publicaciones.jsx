'use client';

import Link from 'next/link';
import { useState } from 'react';
import Icono from '../_componentes/Icono';

const FILTROS = [
  { id: 'todos', texto: 'Todos' },
  { id: 'oferta', texto: 'Puedo Prestar', icono: 'volunteer_activism', color: 'text-primary' },
  { id: 'solicitud', texto: 'Necesito Préstamo', icono: 'request_quote', color: 'text-secondary' },
  { id: 'cochabamba', texto: 'En Cochabamba', icono: 'location_on', color: 'text-tertiary' },
];

const PUBLICACIONES = [
  { id: 'alan', tipo: 'oferta', Tarjeta: TarjetaAlan },
  { id: 'jose', tipo: 'solicitud', Tarjeta: TarjetaJose },
  { id: 'brenda', tipo: 'oferta', Tarjeta: TarjetaBrenda },
];

export default function Publicaciones() {
  const [filtro, setFiltro] = useState('todos');
  // Todas las publicaciones de ejemplo están en Cochabamba.
  const visibles = PUBLICACIONES.filter((p) => filtro === 'todos' || filtro === 'cochabamba' || p.tipo === filtro);

  return (
    <>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-margin px-margin sin-scrollbar">
        {FILTROS.map((f) => {
          const activo = filtro === f.id;
          return (
            <button key={f.id} type="button" onClick={() => setFiltro(f.id)} aria-pressed={activo}
              className={`shrink-0 h-9 px-3.5 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-all active:scale-95 ${
                activo ? 'bg-primary text-on-primary shadow-md shadow-primary/20' : 'bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-variant'
              }`}>
              {f.icono && <Icono nombre={f.icono} tam={16} className={activo ? '' : f.color} />}
              <span>{f.texto}</span>
              {f.id === 'todos' && <span className="text-label-sm bg-on-primary/20 px-1.5 py-0.5 rounded-full">14</span>}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {visibles.map(({ id, Tarjeta }) => <Tarjeta key={id} />)}
      </div>
    </>
  );
}

function Cabecera({ foto, nombre, insignia, children }) {
  return (
    <div className="flex items-start justify-between gap-2 mb-3">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <img src={foto} alt={nombre} className="w-11 h-11 rounded-full object-cover bg-surface-container-highest" />
          {insignia}
        </div>
        {children[0]}
      </div>
      <div className="text-right">{children[1]}</div>
    </div>
  );
}

function TarjetaAlan() {
  return (
    <div className="relative bg-surface-container rounded-xl p-space-md shadow-xl overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
      <Cabecera foto="/img/alan-m.jpg" nombre="Alan M."
        insignia={<span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-primary ring-2 ring-surface-container" />}>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Alan M.</span>
            <Icono nombre="verified" tam={17} relleno className="text-primary" />
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">⭐ Muy cumplido</span>
          </div>
        </div>
        <>
          <span className="font-metric-mono text-label-sm uppercase text-on-surface-variant block">Honor Score</span>
          <div className="flex items-center justify-end gap-1 text-primary">
            <Icono nombre="speed" tam={16} />
            <span className="font-metric-mono text-headline-sm font-bold">860</span>
          </div>
        </>
      </Cabecera>

      <div className="bg-surface-container-low rounded-lg p-3 my-2 space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="font-metric-mono text-label-md text-primary uppercase tracking-wide">Ofrece préstamo</span>
          <span className="font-metric-mono text-label-sm text-secondary">Cochabamba, La Cancha</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-headline-lg-mobile text-headline-lg-mobile font-extrabold text-on-surface tracking-tight">Bs 2,000</span>
          <span className="font-metric-mono text-body-sm text-on-surface-variant">/ 30 días plazo</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Para comerciantes del rubro abarrotes o confección. Trato en persona con doble firma en QR.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 my-3 text-center">
        <div className="bg-surface-container-high/60 rounded-lg py-1.5 px-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Cumplimiento</span>
          <span className="font-metric-mono text-label-md text-primary font-semibold">94% a tiempo</span>
        </div>
        <div className="bg-surface-container-high/60 rounded-lg py-1.5 px-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Tratos cerrados</span>
          <span className="font-metric-mono text-label-md text-on-surface font-semibold">18 personas</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-surface-variant/40">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            {['mini-artesana', 'mini-vendedor', 'mini-tendero'].map((f) => (
              <img key={f} src={`/img/${f}.jpg`} alt="" className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-surface-container" />
            ))}
          </div>
          <span className="font-label-sm text-label-sm font-semibold text-primary">3 interesados</span>
        </div>
        <Link href="/tablon/interesados" className="h-9 px-3 bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container font-label-md text-label-md rounded-lg flex items-center gap-1 transition-colors">
          <span>Ver interesados y comparar</span>
          <Icono nombre="chevron_right" tam={16} />
        </Link>
      </div>
    </div>
  );
}

function TarjetaJose() {
  return (
    <div className="relative bg-surface-container rounded-xl p-space-md shadow-md">
      <Cabecera foto="/img/jose-r.jpg" nombre="José R.">
        <div>
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">José R.</span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant">🤝 Cumplido</span>
          </div>
        </div>
        <>
          <span className="font-metric-mono text-label-sm uppercase text-on-surface-variant block">Score</span>
          <span className="font-metric-mono text-headline-sm font-bold text-secondary">740</span>
        </>
      </Cabecera>

      <div className="bg-surface-container-low rounded-lg p-3 my-2 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-metric-mono text-label-sm text-secondary uppercase">Solicitud urgente</span>
          <span className="font-metric-mono text-label-sm text-on-surface-variant">Hace 2 horas</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">Bs 800</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">para mercadería</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Reposición de insumos de feria sábado. Retorno pactado en 10 días hábiles con interés acordado.</p>
      </div>

      <div className="flex items-center gap-2 py-1 text-on-surface-variant">
        <span className="font-metric-mono text-label-sm bg-surface-container-high px-2 py-0.5 rounded text-primary">100% a tiempo</span>
        <span className="font-metric-mono text-label-sm bg-surface-container-high px-2 py-0.5 rounded">4 tratos concluidos</span>
      </div>

      <div className="pt-3 mt-1 flex items-center justify-between">
        <div className="flex items-center gap-1 text-on-surface-variant">
          <Icono nombre="pin_drop" tam={16} className="text-primary" />
          <span className="font-label-sm text-label-sm">Quillacollo centro</span>
        </div>
        <button type="button" className="h-9 px-4 bg-primary text-on-primary hover:bg-primary-fixed font-label-md text-label-md font-bold rounded-lg transition-all active:scale-95 flex items-center gap-1 shadow-sm shadow-primary/20">
          <Icono nombre="handshake" tam={18} />
          <span>Me interesa</span>
        </button>
      </div>
    </div>
  );
}

function TarjetaBrenda() {
  return (
    <div className="relative bg-surface-container rounded-xl p-space-md shadow-md overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-tertiary/10 rounded-full blur-xl pointer-events-none" />
      <Cabecera foto="/img/brenda-c.jpg" nombre="Brenda C."
        insignia={
          <span className="absolute -bottom-1 -right-1 bg-surface-container-lowest rounded-full p-0.5 flex">
            <Icono nombre="workspace_premium" tam={14} className="text-tertiary" />
          </span>
        }>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Brenda C.</span>
            <Icono nombre="verified_user" tam={16} className="text-tertiary" />
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container/60 text-secondary">🏆 Palabra de oro</span>
          </div>
        </div>
        <>
          <span className="font-metric-mono text-label-sm uppercase text-on-surface-variant block">Score Máximo</span>
          <span className="font-metric-mono text-headline-sm font-bold text-tertiary">965</span>
        </>
      </Cabecera>

      <div className="bg-surface-container-low rounded-lg p-3 my-2 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-metric-mono text-label-sm text-tertiary uppercase tracking-wide">Microcrédito Exprés</span>
          <span className="font-metric-mono text-label-sm text-primary flex items-center gap-1">
            <Icono nombre="verified" tam={13} />0 disputas
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">Bs 1,000</span>
          <span className="font-metric-mono text-body-sm text-on-surface-variant">(15 días)</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Fondos listos para entrega presencial. Prioridad a participantes con score mayor a 600.</p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="inline-flex items-center gap-1 bg-surface-container-high/80 px-2 py-1 rounded-md">
          <Icono nombre="neurology" tam={14} className="text-tertiary" />
          <span className="font-metric-mono text-label-sm text-on-surface">Auditado por Qwen ERC-8004</span>
        </div>
        <button type="button" className="h-9 px-3.5 bg-surface-variant hover:bg-surface-bright text-on-surface font-label-md text-label-md rounded-lg flex items-center gap-1 transition-colors">
          <span>Postular</span>
          <Icono nombre="arrow_outward" tam={16} />
        </button>
      </div>
    </div>
  );
}
