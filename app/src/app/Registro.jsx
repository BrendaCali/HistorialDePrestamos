'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const PASOS = ['Tu carnet de identidad', 'Una selfie', 'Tu huella'];
const CI_VALIDO = /^\d{5,9}(-?[0-9A-Z]{1,2})?$/;

export default function Registro() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [ci, setCi] = useState('');
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState('');
  const [selfie, setSelfie] = useState(null);
  const [camara, setCamara] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const apagarCamara = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCamara(false);
  };

  useEffect(() => apagarCamara, []);

  const abrirCamara = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      setSelfie(null);
      setCamara(true);
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    } catch {
      setError('No pudimos abrir la cámara. Revisa el permiso del navegador.');
    }
  };

  const capturar = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const c = document.createElement('canvas');
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext('2d').drawImage(v, 0, 0);
    setSelfie(c.toDataURL('image/jpeg', 0.85));
    apagarCamara();
  };

  const elegirFoto = (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    if (foto) URL.revokeObjectURL(foto);
    setFoto(URL.createObjectURL(archivo));
    setError('');
  };

  const continuarCarnet = () => {
    const limpio = ci.trim().toUpperCase().replace(/\s+/g, '');
    if (!CI_VALIDO.test(limpio)) return setError('Escribe tu número de carnet, por ejemplo 1234567 LP.');
    if (!foto) return setError('Toma o sube una foto de tu carnet.');
    setCi(limpio);
    setError('');
    setPaso(1);
  };

  return (
    <main className="auth">
      <section className="auth-lado">
        <div className="logo">garante</div>
        <div>
          <span className="etiqueta">Tu palabra ahora tiene historial</span>
          <h1>Tus préstamos, con reputación que nadie borra.</h1>
          <p>Registra los préstamos que haces en persona y arma un historial verificable.</p>
          <div className="pasos">
            {PASOS.map((p, i) => (
              <div key={p} className={`paso${i === paso ? ' activo' : ''}${i < paso ? ' hecho' : ''}`}>
                <b>{i < paso ? '✓' : i + 1}</b>
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="auth-form">
        <div className="form-caja">
          {paso === 0 && (
            <>
              <h2>Verifica tu carnet</h2>
              <p className="sub">1 carnet = 1 cuenta. Así evitamos cuentas falsas.</p>

              <label htmlFor="ci">Número de carnet</label>
              <input id="ci" className="claro" placeholder="Ej. 1234567 LP" value={ci}
                onChange={(e) => { setCi(e.target.value); setError(''); }} />

              <label>Foto del carnet (anverso)</label>
              <label className={`subida${foto ? ' con-foto' : ''}`}>
                {foto ? <img src={foto} alt="Vista previa del carnet" /> : <span>Toca para tomar o subir una foto</span>}
                <input type="file" accept="image/*" capture="environment" onChange={elegirFoto} hidden />
              </label>

              {error && <p className="error" role="alert">{error}</p>}
              <button className="boton" onClick={continuarCarnet}>Continuar</button>
              <div className="sep">o</div>
              <button className="boton sec" onClick={() => router.push('/tablon')}>Soy juez: entrar con una cuenta de prueba</button>
              <p className="aviso">Tu carnet nunca se publica. En la blockchain solo queda que eres una persona verificada.</p>
            </>
          )}

          {paso === 1 && (
            <>
              <h2>Ahora, una selfie</h2>
              <p className="sub">La compararemos con la foto de tu carnet. Mira de frente y con buena luz.</p>

              <div className="visor">
                {camara && <video ref={videoRef} autoPlay playsInline muted />}
                {!camara && selfie && <img src={selfie} alt="Tu selfie" />}
                {!camara && !selfie && <span>La cámara está apagada</span>}
              </div>

              {error && <p className="error" role="alert">{error}</p>}
              {camara && <button className="boton" onClick={capturar}>Capturar</button>}
              {!camara && !selfie && <button className="boton" onClick={abrirCamara}>Tomar selfie</button>}
              {!camara && selfie && (
                <>
                  <button className="boton" onClick={() => setPaso(2)}>Usar esta selfie</button>
                  <button className="boton sec" onClick={abrirCamara}>Repetir</button>
                </>
              )}
              <button className="boton sec" onClick={() => { apagarCamara(); setPaso(0); }}>Volver</button>
              <p className="aviso">La selfie se queda en tu dispositivo hasta que se verifique.</p>
            </>
          )}

          {paso === 2 && (
            <>
              <h2>Tu huella será tu llave</h2>
              <p className="sub">Sin contraseñas ni frases semilla.</p>
              <button className="boton" onClick={() => router.push('/tablon')}>Crear cuenta con mi huella</button>
              <button className="boton sec" onClick={() => setPaso(1)}>Volver</button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
