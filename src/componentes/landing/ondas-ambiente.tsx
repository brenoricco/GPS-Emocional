/**
 * Ondas ambiente sutis no fundo da landing.
 * SVG puro com animação CSS (sem JS). Respeita prefers-reduced-motion.
 */
export function OndasAmbiente() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="absolute -bottom-10 left-0 w-[200%] h-64 animate-ondular-horizontal-lento"
        viewBox="0 0 1600 200"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 100 Q 200 70 400 100 T 800 100 T 1200 100 T 1600 100 L 1600 200 L 0 200 Z"
          fill="#A5D3DC"
          fillOpacity="0.18"
        />
      </svg>
      <svg
        className="absolute -bottom-4 left-0 w-[200%] h-72 animate-ondular-horizontal-medio"
        viewBox="0 0 1600 200"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 130 Q 250 100 500 130 T 1000 130 T 1500 130 T 1600 130 L 1600 200 L 0 200 Z"
          fill="#76BCAB"
          fillOpacity="0.12"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-[200%] h-80 animate-ondular-horizontal-rapido"
        viewBox="0 0 1600 200"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 160 Q 300 140 600 160 T 1200 160 T 1600 160 L 1600 200 L 0 200 Z"
          fill="#338670"
          fillOpacity="0.08"
        />
      </svg>
    </div>
  );
}
