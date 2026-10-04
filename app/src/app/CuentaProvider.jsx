'use client';

import { createContext, useContext, useRef, useState } from 'react';
import { crearCuenta, enviarPrueba, entrarConHuella } from '../lib/mera';

const Ctx = createContext(null);
export const useCuenta = () => useContext(Ctx);

// La sesión de firma vive solo en memoria: al recargar hay que volver a entrar con la huella.
export default function CuentaProvider({ children }) {
  const sesionRef = useRef(null);
  const [direccion, setDireccion] = useState(null);

  const adoptar = (r) => {
    sesionRef.current?.sesion.end();
    sesionRef.current = r;
    setDireccion(r.direccion);
    return r;
  };

  const valor = {
    direccion,
    crear: async (nombre) => adoptar(await crearCuenta(nombre)),
    entrar: async () => adoptar(await entrarConHuella()),
    firmar: (mensaje) => sesionRef.current.cuenta.signMessage({ message: mensaje }),
    enviar: () => enviarPrueba(sesionRef.current.cuenta),
    salir: () => {
      sesionRef.current?.sesion.end();
      sesionRef.current = null;
      setDireccion(null);
    },
  };
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}
