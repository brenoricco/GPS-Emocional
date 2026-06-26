/**
 * Gerenciador de lembretes locais (client-side, sem servidor).
 *
 * MVP: persiste preferência em localStorage. Quando o usuário abre o app
 * num horário ≥ horário de lembrete, mostra uma Notification se ainda não
 * mostrou hoje.
 *
 * Versão FUTURA com Web Push: trocará persistência por endpoint server e
 * usará VAPID + ServiceWorkerRegistration.showNotification em background.
 */

export interface PreferenciaLembrete {
  ativo: boolean;
  horaLocal: number; // 0-23, em horário local
  ultimoDisparoIso: string | null;
}

const CHAVE = "gps-emocional:lembrete";

const PADRAO: PreferenciaLembrete = {
  ativo: false,
  horaLocal: 21,
  ultimoDisparoIso: null,
};

export function carregarPreferencia(): PreferenciaLembrete {
  if (typeof window === "undefined") return PADRAO;
  const cru = localStorage.getItem(CHAVE);
  if (!cru) return PADRAO;
  try {
    return { ...PADRAO, ...JSON.parse(cru) };
  } catch {
    return PADRAO;
  }
}

export function salvarPreferencia(pref: PreferenciaLembrete): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAVE, JSON.stringify(pref));
}

export function suportaNotificacao(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export async function pedirPermissao(): Promise<NotificationPermission> {
  if (!suportaNotificacao()) return "denied";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return Notification.requestPermission();
}

const MENSAGENS_LEMBRETE = [
  {
    titulo: "Sem cobrança. Só checagem.",
    corpo: "Como você está agora?",
  },
  {
    titulo: "Oi.",
    corpo: "Reservei um minuto pra ti. Vem?",
  },
  {
    titulo: "Está aqui se precisar.",
    corpo: "Um check-in rápido pra ancorar o dia.",
  },
  {
    titulo: "Respira.",
    corpo: "A gente continua na sua hora.",
  },
];

function escolherMensagem() {
  return MENSAGENS_LEMBRETE[
    Math.floor(Math.random() * MENSAGENS_LEMBRETE.length)
  ]!;
}

function ehMesmoDia(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Dispara lembrete se as condições forem atendidas:
 *  - permissão concedida
 *  - lembrete ativo
 *  - hora atual >= hora configurada
 *  - ainda não disparou hoje
 */
export function dispararLembreteSeApropriado(): boolean {
  if (!suportaNotificacao()) return false;
  if (Notification.permission !== "granted") return false;

  const pref = carregarPreferencia();
  if (!pref.ativo) return false;

  const agora = new Date();
  if (agora.getHours() < pref.horaLocal) return false;

  if (pref.ultimoDisparoIso) {
    const ultimo = new Date(pref.ultimoDisparoIso);
    if (ehMesmoDia(ultimo, agora)) return false;
  }

  const msg = escolherMensagem();
  try {
    new Notification(msg.titulo, {
      body: msg.corpo,
      icon: "/icone-192.png",
      badge: "/icone-192.png",
      tag: "gps-emocional-lembrete-diario",
    });
    salvarPreferencia({ ...pref, ultimoDisparoIso: agora.toISOString() });
    return true;
  } catch {
    return false;
  }
}
