import Encabezado from '../_componentes/Encabezado';
import NavInferior from '../_componentes/NavInferior';
import CodigoDobleFirma from './CodigoDobleFirma';

export const metadata = { title: 'Mi Código · Garante' };

export default function MiCodigo() {
  return (
    <>
      <Encabezado titulo="Mi Código" />
      <main className="flex flex-col relative w-full pt-16 pb-20">
        <div className="flex flex-col w-full px-margin pb-space-xl">
          <CodigoDobleFirma />
        </div>
      </main>
      <NavInferior />
    </>
  );
}
