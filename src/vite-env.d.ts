/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY?: string;
  // agrega aquí las variables que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}