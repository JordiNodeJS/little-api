/**
 * 📚 ENDPOINT DE CONSEJOS ALEATORIOS
 * 
 * Este archivo demuestra cómo crear un endpoint API en Next.js 16 usando App Router.
 * Consumimos la API pública "Advice Slip API" y transformamos su respuesta.
 * 
 * 🎯 Conceptos clave:
 * - Route Handlers en App Router (route.ts)
 * - Manejo de Request y Response
 * - Consumo de APIs externas con fetch
 * - Tipado con TypeScript
 * - Manejo de errores y status codes
 * - Validación de parámetros query
 */

import { NextRequest } from 'next/server';

// ✅ PASO 1: Definir interfaces TypeScript para tipar la respuesta de la API externa
// Esto mejora la seguridad de tipos y ayuda al autocompletado en el IDE

/**
 * Interfaz que representa la estructura de la respuesta de Advice Slip API
 * @see https://api.adviceslip.com/
 */
interface AdviceSlipResponse {
  slip: {
    id: number;
    advice: string;
  };
}

/**
 * Interfaz que representa la respuesta que nuestro endpoint devolverá al cliente
 * Simplificamos la estructura original para hacerla más clara
 */
interface ApiResponse {
  success: boolean;
  data?: {
    id: number;
    advice: string;
    source: string;
    timestamp: string;
  };
  error?: string;
}

/**
 * ✅ PASO 2: Exportar función GET
 * 
 * En Next.js 15 App Router, los Route Handlers deben exportar funciones nombradas
 * según el método HTTP: GET, POST, PUT, DELETE, etc.
 * 
 * @param request - Objeto NextRequest que contiene información de la petición
 * @returns Response - Objeto Response con el resultado en formato JSON
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    // ✅ PASO 3: Extraer parámetros de la query string
    // searchParams nos permite acceder a los parámetros de la URL
    // Ejemplo: /api/advice?lang=es&format=json
    const { searchParams } = new URL(request.url);
    
    // Obtener parámetro opcional 'id' para solicitar un consejo específico
    const adviceId = searchParams.get('id');
    
    // ✅ PASO 4: Validación básica de parámetros
    // Si se proporciona un ID, validamos que sea un número válido
    if (adviceId && (isNaN(Number(adviceId)) || Number(adviceId) <= 0)) {
      return Response.json(
        {
          success: false,
          error: 'El parámetro "id" debe ser un número positivo válido',
        } satisfies ApiResponse,
        { status: 400 } // 400 = Bad Request (solicitud incorrecta)
      );
    }

    // ✅ PASO 5: Construir la URL de la API externa
    // Si tenemos un ID específico, lo usamos; si no, pedimos un consejo aleatorio
    const apiUrl = adviceId 
      ? `https://api.adviceslip.com/advice/${adviceId}`
      : 'https://api.adviceslip.com/advice';

    console.log(`🌐 Consultando API externa: ${apiUrl}`);

    // ✅ PASO 6: Hacer fetch a la API externa
    // Next.js 15 mejora el fetch nativo con caching automático y otras optimizaciones
    const response = await fetch(apiUrl, {
      // Configuramos el cache para que no se almacene (siempre datos frescos)
      cache: 'no-store',
      // Añadimos headers personalizados si fuera necesario
      headers: {
        'Accept': 'application/json',
      },
    });

    // ✅ PASO 7: Verificar que la respuesta sea exitosa (status 200-299)
    if (!response.ok) {
      // Si la API externa falla, manejamos el error apropiadamente
      console.error(`❌ Error en API externa: ${response.status} ${response.statusText}`);
      
      // Si el ID no existe, la API devuelve 404
      if (response.status === 404) {
        return Response.json(
          {
            success: false,
            error: `No se encontró ningún consejo con el ID ${adviceId}`,
          } satisfies ApiResponse,
          { status: 404 }
        );
      }

      throw new Error(`API externa respondió con status: ${response.status}`);
    }

    // ✅ PASO 8: Parsear la respuesta JSON con tipado
    const data: AdviceSlipResponse = await response.json();

    // ✅ PASO 8.5: Validar que la respuesta contenga datos válidos
    // Algunas APIs pueden devolver 200 OK pero sin el objeto esperado
    // o con campos undefined cuando el recurso no existe
    if (!data.slip || !data.slip.advice) {
      return Response.json(
        {
          success: false,
          error: adviceId 
            ? `No se encontró ningún consejo con el ID ${adviceId}`
            : 'No se pudo obtener un consejo en este momento',
        } satisfies ApiResponse,
        { status: 404 }
      );
    }

    // ✅ PASO 9: Transformar y simplificar la respuesta
    // Creamos una estructura más limpia y añadimos metadatos útiles
    const simplifiedResponse: ApiResponse = {
      success: true,
      data: {
        id: data.slip.id,
        advice: data.slip.advice,
        source: 'Advice Slip API',
        timestamp: new Date().toISOString(),
      },
    };

    console.log(`✅ Consejo obtenido exitosamente (ID: ${data.slip.id})`);

    // ✅ PASO 10: Devolver respuesta exitosa
    // Response.json() es una utilidad de Next.js para devolver JSON fácilmente
    return Response.json(simplifiedResponse, {
      status: 200,
      headers: {
        // Configurar headers CORS si queremos permitir acceso desde otros dominios
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        // Añadir headers de cache si queremos controlar el caching del navegador
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    // ✅ PASO 11: Manejo global de errores
    // Capturamos cualquier error no previsto y devolvemos una respuesta apropiada
    console.error('❌ Error en el endpoint:', error);

    // Construimos un mensaje de error seguro (sin exponer detalles internos en producción)
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Error desconocido al procesar la solicitud';

    return Response.json(
      {
        success: false,
        error: process.env.NODE_ENV === 'development' 
          ? errorMessage 
          : 'Error interno del servidor. Por favor, intenta nuevamente.',
      } satisfies ApiResponse,
      { status: 500 } // 500 = Internal Server Error
    );
  }
}

/**
 * 🔧 OPCIONAL: Configurar metadata del route
 * 
 * Puedes exportar configuraciones especiales para este endpoint
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
 */
export const dynamic = 'force-dynamic'; // Forzar que siempre se ejecute dinámicamente
export const revalidate = 0; // No cachear este endpoint

/**
 * 📖 EJEMPLOS DE USO:
 * 
 * 1. Obtener un consejo aleatorio:
 *    GET http://localhost:3000/api/advice
 * 
 * 2. Obtener un consejo específico por ID:
 *    GET http://localhost:3000/api/advice?id=42
 * 
 * 3. Respuesta exitosa:
 *    {
 *      "success": true,
 *      "data": {
 *        "id": 42,
 *        "advice": "Don't be afraid to fail.",
 *        "source": "Advice Slip API",
 *        "timestamp": "2025-10-02T15:30:00.000Z"
 *      }
 *    }
 * 
 * 4. Respuesta de error:
 *    {
 *      "success": false,
 *      "error": "El parámetro 'id' debe ser un número positivo válido"
 *    }
 */

