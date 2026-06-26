import {
  REGIOES_MAPA,
  VIEW_BOX_MAPA,
  type RegiaoMapa,
} from "@/lib/clinico/regioes-mapa";

interface PropsMapa {
  regiaoAtualSlug?: string;
  regiaoDestinoSlug?: string;
}

/**
 * SVG do mapa emocional Oceano Calmo.
 *
 * Renderiza 8 regiões posicionadas no viewBox 360x520 (proporção mobile).
 * O pino animado marca a região atual do usuário. Se houver destino,
 * desenha rota tracejada da origem ao destino.
 */
export function MapaEmocional({
  regiaoAtualSlug,
  regiaoDestinoSlug,
}: PropsMapa) {
  const regiaoAtual = regiaoAtualSlug
    ? REGIOES_MAPA.find((r) => r.slug === regiaoAtualSlug)
    : undefined;
  const regiaoDestino = regiaoDestinoSlug
    ? REGIOES_MAPA.find((r) => r.slug === regiaoDestinoSlug)
    : undefined;

  return (
    <div className="relative w-full max-w-[360px] mx-auto">
      <svg
        viewBox={`0 0 ${VIEW_BOX_MAPA.largura} ${VIEW_BOX_MAPA.altura}`}
        className="w-full h-auto drop-shadow-md"
        role="img"
        aria-label="Mapa Emocional Oceano Calmo"
      >
        <defs>
          <linearGradient id="fundoOceano" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ECF5F7" />
            <stop offset="40%" stopColor="#A5D3DC" />
            <stop offset="100%" stopColor="#283C49" />
          </linearGradient>
          <radialGradient id="brilhoPino" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="ondas"
            x="0"
            y="0"
            width="40"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 10 Q10 5 20 10 T40 10"
              stroke="#FFFFFF"
              strokeOpacity="0.06"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>

        {/* Mar */}
        <rect
          width={VIEW_BOX_MAPA.largura}
          height={VIEW_BOX_MAPA.altura}
          rx="24"
          fill="url(#fundoOceano)"
        />
        <rect
          width={VIEW_BOX_MAPA.largura}
          height={VIEW_BOX_MAPA.altura}
          rx="24"
          fill="url(#ondas)"
        />

        {/* Rota */}
        {regiaoAtual && regiaoDestino && (
          <path
            d={construirArco(regiaoAtual, regiaoDestino)}
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="4 6"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        )}

        {/* Regiões */}
        {REGIOES_MAPA.map((regiao) => {
          const ehAtual = regiaoAtual?.slug === regiao.slug;
          const ehDestino = regiaoDestino?.slug === regiao.slug;
          return (
            <g key={regiao.slug}>
              <circle
                cx={regiao.pinX}
                cy={regiao.pinY}
                r={regiao.raio + (ehAtual ? 4 : 0)}
                fill={regiao.cor}
                fillOpacity={ehAtual || ehDestino ? "0.85" : "0.55"}
                stroke={regiao.corContorno}
                strokeWidth={ehAtual ? "3" : "1.5"}
              />
              <text
                x={regiao.pinX}
                y={regiao.pinY + 6}
                textAnchor="middle"
                fontSize="22"
              >
                {regiao.emoji}
              </text>
              <text
                x={regiao.pinX}
                y={regiao.pinY + (regiao.rotuloDy ?? 56)}
                textAnchor="middle"
                fontSize="11"
                fontWeight={ehAtual ? "600" : "500"}
                fill="#FFFFFF"
                style={{
                  filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))",
                }}
              >
                {regiao.nome}
              </text>
            </g>
          );
        })}

        {/* Pino do usuário */}
        {regiaoAtual && (
          <g>
            <circle
              cx={regiaoAtual.pinX}
              cy={regiaoAtual.pinY}
              r={regiaoAtual.raio + 16}
              fill="url(#brilhoPino)"
              opacity="0.6"
            >
              <animate
                attributeName="r"
                from={regiaoAtual.raio + 10}
                to={regiaoAtual.raio + 24}
                dur="2.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.7"
                to="0"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={regiaoAtual.pinX}
              cy={regiaoAtual.pinY - regiaoAtual.raio - 14}
              r="6"
              fill="#FFFFFF"
              stroke={regiaoAtual.corContorno}
              strokeWidth="2"
            />
            <path
              d={`M ${regiaoAtual.pinX} ${regiaoAtual.pinY - regiaoAtual.raio - 8} L ${regiaoAtual.pinX} ${regiaoAtual.pinY - regiaoAtual.raio + 2}`}
              stroke={regiaoAtual.corContorno}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>

      {regiaoAtual && (
        <span className="sr-only">
          Você está em {regiaoAtual.nome}
          {regiaoDestino ? `, rumo a ${regiaoDestino.nome}` : ""}.
        </span>
      )}
    </div>
  );
}

function construirArco(de: RegiaoMapa, ate: RegiaoMapa): string {
  const meioX = (de.pinX + ate.pinX) / 2;
  const meioY = (de.pinY + ate.pinY) / 2 - 30;
  return `M ${de.pinX} ${de.pinY} Q ${meioX} ${meioY} ${ate.pinX} ${ate.pinY}`;
}
