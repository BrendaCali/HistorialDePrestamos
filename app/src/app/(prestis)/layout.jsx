import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './prestis.css';

const inter = Inter({ subsets: ['latin'], variable: '--fuente-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--fuente-jakarta' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--fuente-mono' });

export default function PrestisLayout({ children }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        precedence="default"
      />
      <div
        className={`${inter.variable} ${jakarta.variable} ${mono.variable} font-body-md text-body-md text-on-surface bg-surface min-h-dvh mx-auto max-w-md relative flex flex-col`}
      >
        {children}
      </div>
    </>
  );
}
