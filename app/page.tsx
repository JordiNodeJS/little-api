/**
 * 🏠 Página Principal de Little API
 *
 * Esta página sirve como documentación interactiva de los endpoints disponibles.
 */

// Metadata para SEO (Next.js App Router compatible)
export const metadata = {
  title: "Little API — Endpoints educativos para Next.js",
  description:
    "Little API es un proyecto educativo que muestra cómo crear endpoints en Next.js 16 con buenas prácticas. Prueba /api/advice y /api/dog. Consultoría web: info@webcode.es",
  keywords: [
    "Next.js",
    "API",
    "endpoints",
    "TypeScript",
    "Little API",
    "webcode.es",
    "consultoría web",
  ],
  metadataBase: new URL("https://webcode.es"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Little API — Endpoints educativos",
    description:
      "Proyecto educativo para aprender a crear endpoints en Next.js 16 con buenas prácticas. Consultoría web: info@webcode.es",
    url: "https://webcode.es/",
    siteName: "Little API",
    images: ["/file.svg"],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Little API — Endpoints educativos",
    description:
      "Proyecto educativo para aprender a crear endpoints en Next.js 16 con buenas prácticas.",
    images: ["/file.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
} as const;

export default function Home() {
  return (
    <main className="min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎓 Little API
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Proyecto educativo para aprender a crear endpoints en Next.js 16 con
            buenas prácticas
          </p>
        </header>

        {/* Endpoints Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🔌</span>
            <span>Endpoints Disponibles</span>
          </h2>

          {/* Advice Endpoint */}
          <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span>💡</span>
              <code className="text-blue-600 dark:text-blue-400">
                /api/advice
              </code>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Obtiene consejos aleatorios desde Advice Slip API
            </p>

            <div className="space-y-2">
              <div>
                <span className="font-semibold">Método:</span>{" "}
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm font-mono">
                  GET
                </span>
              </div>

              <div>
                <span className="font-semibold">Parámetros:</span>
                <ul className="mt-2 ml-6 space-y-1 text-sm">
                  <li>
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      id
                    </code>{" "}
                    (opcional) - ID del consejo específico
                  </li>
                </ul>
              </div>

              <div>
                <span className="font-semibold">Ejemplos:</span>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a
                      href="/api/advice"
                      target="_blank"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-mono"
                    >
                      /api/advice
                    </a>
                    <span className="text-gray-500 text-sm ml-2">
                      → Consejo aleatorio
                    </span>
                  </li>
                  <li>
                    <a
                      href="/api/advice?id=42"
                      target="_blank"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-mono"
                    >
                      /api/advice?id=42
                    </a>
                    <span className="text-gray-500 text-sm ml-2">
                      → Consejo #42
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Dog Endpoint */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span>🐕</span>
              <code className="text-blue-600 dark:text-blue-400">/api/dog</code>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Obtiene imágenes aleatorias de perros desde Dog CEO API
            </p>

            <div className="space-y-2">
              <div>
                <span className="font-semibold">Método:</span>{" "}
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm font-mono">
                  GET
                </span>
              </div>

              <div>
                <span className="font-semibold">Parámetros:</span>
                <ul className="mt-2 ml-6 space-y-1 text-sm">
                  <li>
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      breed
                    </code>{" "}
                    (opcional) - Raza del perro (ej: husky, corgi, beagle)
                  </li>
                </ul>
              </div>

              <div>
                <span className="font-semibold">Ejemplos:</span>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a
                      href="/api/dog"
                      target="_blank"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-mono"
                    >
                      /api/dog
                    </a>
                    <span className="text-gray-500 text-sm ml-2">
                      → Perro aleatorio
                    </span>
                  </li>
                  <li>
                    <a
                      href="/api/dog?breed=husky"
                      target="_blank"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-mono"
                    >
                      /api/dog?breed=husky
                    </a>
                    <span className="text-gray-500 text-sm ml-2">
                      → Husky siberiano
                    </span>
                  </li>
                  <li>
                    <a
                      href="/api/dog?breed=corgi"
                      target="_blank"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-mono"
                    >
                      /api/dog?breed=corgi
                    </a>
                    <span className="text-gray-500 text-sm ml-2">→ Corgi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🚀</span>
            <span>Quick Start</span>
          </h2>

          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  1.
                </span>
                <div>
                  <p className="font-semibold">Instalar dependencias</p>
                  <code className="block mt-1 bg-black text-green-400 p-2 rounded text-sm">
                    pnpm install
                  </code>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  2.
                </span>
                <div>
                  <p className="font-semibold">
                    Iniciar servidor de desarrollo
                  </p>
                  <code className="block mt-1 bg-black text-green-400 p-2 rounded text-sm">
                    pnpm dev
                  </code>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  3.
                </span>
                <div>
                  <p className="font-semibold">
                    Probar endpoints en el navegador o con cURL
                  </p>
                  <code className="block mt-1 bg-black text-green-400 p-2 rounded text-sm">
                    curl http://localhost:3000/api/advice
                  </code>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  4.
                </span>
                <div>
                  <p className="font-semibold">Ejecutar tests automáticos</p>
                  <code className="block mt-1 bg-black text-green-400 p-2 rounded text-sm">
                    node test-api.js
                  </code>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Documentation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>📚</span>
            <span>Documentación</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://github.com/JordiNodeJS/little-api/blob/main/docs/TUTORIAL.md"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span>📖</span>
                <span>Tutorial Completo</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Guía paso a paso para crear endpoints desde cero
              </p>
            </a>

            <a
              href="https://github.com/JordiNodeJS/little-api/blob/main/docs/TESTING.md"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span>🧪</span>
                <span>Guía de Testing</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Aprende a probar tus endpoints con diferentes herramientas
              </p>
            </a>

            <a
              href="https://github.com/JordiNodeJS/little-api/blob/main/docs/LESSONS-LEARNED.md"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span>💡</span>
                <span>Lecciones Aprendidas</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Conceptos clave y mejores prácticas
              </p>
            </a>

            <a
              href="https://github.com/JordiNodeJS/little-api/blob/main/.github/prompts/ai-coding-rules.md"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span>🤖</span>
                <span>Reglas de AI</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Guías para asistentes de codificación IA
              </p>
            </a>
          </div>
        </section>

        {/* Technologies */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🛠️</span>
            <span>Tecnologías</span>
          </h2>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-semibold">
              Next.js 16.0.1
            </span>
            <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
              TypeScript 5.9
            </span>
            <span className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold">
              React 19
            </span>
            <span className="px-4 py-2 bg-cyan-600 text-white rounded-full text-sm font-semibold">
              TailwindCSS 4
            </span>
            <span className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-semibold">
              App Router
            </span>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p>
            Hecho con <span aria-hidden>❤️</span> con fines educativos · creado
            por{" "}
            <a
              href="https://webcode.es"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              webcode.es
            </a>
          </p>
          <p className="mt-1">
            Consultoría web:{" "}
            <a
              href="mailto:info@webcode.es"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              info@webcode.es
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Next.js Docs
            </a>
            {" · "}
            <a
              href="https://github.com/JordiNodeJS/little-api"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
          </p>
        </footer>

        {/* JSON-LD: Organization (mejora SEO y ayuda a los motores de búsqueda) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "webcode.es",
              url: "https://webcode.es",
              sameAs: ["https://github.com/JordiNodeJS/little-api"],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "",
                  contactType: "Consultoría Web",
                  email: "info@webcode.es",
                  availableLanguage: ["es", "en"],
                },
              ],
            }),
          }}
        />
      </div>
    </main>
  );
}
