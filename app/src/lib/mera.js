import {
  createPasskeyWithPrfOutput,
  createSecp256k1SigningSession,
  getEvmAddress,
  getPasskeyPrfOutput,
} from '@category-labs/mera';
import { toViemAccount } from '@category-labs/mera/viem';
import { HDKey } from '@scure/bip32';
import { entropyToMnemonic, mnemonicToSeedSync } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';
import { createPublicClient, createWalletClient, defineChain, formatEther, http } from 'viem';

export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: { default: { http: [process.env.NEXT_PUBLIC_RPC_URL || 'https://testnet-rpc.monad.xyz'] } },
  blockExplorers: { default: { name: 'MonVision', url: 'https://testnet.monadexplorer.com' } },
});

const rpId = () => window.location.hostname;

// La cuenta sale solo de la passkey: el mismo PRF produce siempre la misma clave.
function abrirSesion(prfOutput) {
  const mnemonic = entropyToMnemonic(prfOutput, wordlist);
  const nodo = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic)).derive("m/44'/60'/0'/0/0");
  if (nodo.privateKey === null) throw new Error('No se pudo derivar la clave');
  const sesion = createSecp256k1SigningSession({ privateKey: nodo.privateKey });
  return { sesion, direccion: getEvmAddress(sesion.publicKey), cuenta: toViemAccount(sesion) };
}

export async function crearCuenta(nombre) {
  const { prfOutput } = await createPasskeyWithPrfOutput({
    rp: { id: rpId(), name: 'Preste' },
    user: { name: nombre, displayName: nombre },
  });
  return abrirSesion(prfOutput);
}

export async function entrarConHuella() {
  const { prfOutput } = await getPasskeyPrfOutput({ rpId: rpId() });
  return abrirSesion(prfOutput);
}

export async function saldoMon(direccion) {
  const cliente = createPublicClient({ chain: monadTestnet, transport: http() });
  return formatEther(await cliente.getBalance({ address: direccion }));
}

// Transacción de prueba: 0 MON a la propia cuenta. Se firma con la sesión, sin pedir la huella.
export async function enviarPrueba(cuenta) {
  const wallet = createWalletClient({ account: cuenta, chain: monadTestnet, transport: http() });
  const publico = createPublicClient({ chain: monadTestnet, transport: http() });
  const hash = await wallet.sendTransaction({ to: cuenta.address, value: 0n });
  await publico.waitForTransactionReceipt({ hash });
  return hash;
}
