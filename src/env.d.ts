/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string | undefined;
  readonly VITE_SUPABASE_ANON_KEY: string | undefined;
  // أضف متغيرات بيئة أخرى هنا
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
