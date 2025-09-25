// Déclarations globales utiles pour le projet Vite + React

// Permet d'importer les fichiers CSS/SCSS sans erreurs TS
declare module '*.css';
declare module '*.scss';

// Images et autres assets
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';

// Déclaration spéciale pour SVG ReactComponent (si utilisé)
declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default ReactComponent;
}

declare module "*.mp3" {
  const src: string;
  export default src;
}

// Types pour import.meta.env (variables Vite)
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_APP_TITLE?: string;
  // ajouter d'autres variables VITE_... ici si nécessaire
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
