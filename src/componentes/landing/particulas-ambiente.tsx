/**
 * Partículas suaves flutuando pra cima. Decorativo, baixo contraste.
 * Respeita prefers-reduced-motion via animation-duration overridado em globals.
 */

interface Particula {
  left: string;
  delay: string;
  duracao: string;
  tamanho: number;
}

const PARTICULAS: Particula[] = [
  { left: "12%", delay: "0s", duracao: "18s", tamanho: 6 },
  { left: "28%", delay: "5s", duracao: "22s", tamanho: 4 },
  { left: "47%", delay: "2s", duracao: "20s", tamanho: 5 },
  { left: "63%", delay: "9s", duracao: "24s", tamanho: 4 },
  { left: "78%", delay: "12s", duracao: "19s", tamanho: 6 },
  { left: "90%", delay: "4s", duracao: "26s", tamanho: 3 },
];

export function ParticulasAmbiente() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICULAS.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-brisa-300/50 animate-flutuar-cima"
          style={{
            left: p.left,
            width: `${p.tamanho}px`,
            height: `${p.tamanho}px`,
            animationDelay: p.delay,
            animationDuration: p.duracao,
          }}
        />
      ))}
    </div>
  );
}
