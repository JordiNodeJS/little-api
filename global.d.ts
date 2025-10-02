// Global type declarations for non-TS assets (CSS, images, etc.).
// This prevents TypeScript from complaining about side-effect imports like
// `import './globals.css'` in Next.js app layout files.

declare module "*.css";
declare module "*.scss";
declare module "*.module.css";
declare module "*.module.scss";
declare module "*.svg";

export {};
