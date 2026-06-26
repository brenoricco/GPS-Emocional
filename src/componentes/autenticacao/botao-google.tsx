import { entrarComGoogle } from "@/lib/acoes/acoes-autenticacao";

export function BotaoGoogle() {
  return (
    <form action={entrarComGoogle}>
      <button
        type="submit"
        className="w-full min-h-[56px] px-6 rounded-full bg-white border border-oceano-200 text-oceano-800 font-medium hover:bg-areia-50 transition-colors flex items-center justify-center gap-3 shadow-sm"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            fill="#4285F4"
            d="M19.6 10.23c0-.68-.06-1.34-.18-1.98H10v3.75h5.38a4.6 4.6 0 01-2 3.02v2.51h3.23c1.89-1.74 2.99-4.3 2.99-7.3z"
          />
          <path
            fill="#34A853"
            d="M10 20c2.7 0 4.97-.89 6.62-2.43l-3.23-2.5c-.9.6-2.05.96-3.39.96-2.6 0-4.81-1.76-5.6-4.13H1.07v2.59A10 10 0 0010 20z"
          />
          <path
            fill="#FBBC05"
            d="M4.4 11.9a6 6 0 010-3.8V5.5H1.07a10 10 0 000 9l3.33-2.6z"
          />
          <path
            fill="#EA4335"
            d="M10 3.96c1.47 0 2.78.5 3.81 1.49l2.86-2.86C14.97 1 12.7 0 10 0A10 10 0 001.07 5.5l3.33 2.6C5.2 5.72 7.4 3.96 10 3.96z"
          />
        </svg>
        Continuar com Google
      </button>
    </form>
  );
}
