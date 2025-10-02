/**
 * 📚 ENDPOINT DE IMÁGENES DE PERROS
 * 
 * Este es un segundo ejemplo que demuestra cómo consumir una API diferente.
 * Usamos Dog CEO API que devuelve imágenes aleatorias de perros.
 * 
 * 🎯 Este ejemplo complementa el anterior mostrando:
 * - Cómo trabajar con diferentes estructuras de respuesta
 * - Uso de parámetros más complejos (raza del perro)
 * - Manejo de listas y arrays en las respuestas
 */

import { NextRequest } from 'next/server';

// Interfaces para la API de Dog CEO
interface DogApiResponse {
  message: string | string[]; // Puede ser una URL o un array de URLs
  status: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    imageUrl: string;
    breed?: string;
    timestamp: string;
  };
  error?: string;
}

/**
 * GET /api/dog
 * 
 * Parámetros opcionales:
 * - breed: Raza del perro (ej: "husky", "corgi", "beagle")
 * 
 * @example
 * GET /api/dog
 * GET /api/dog?breed=husky
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const breed = searchParams.get('breed');

    // Construir URL según si se especifica una raza o no
    let apiUrl = 'https://dog.ceo/api/breeds/image/random';
    
    if (breed) {
      // Normalizar el nombre de la raza (lowercase, trim)
      const normalizedBreed = breed.toLowerCase().trim();
      apiUrl = `https://dog.ceo/api/breed/${normalizedBreed}/images/random`;
    }

    console.log(`🐕 Consultando Dog API: ${apiUrl}`);

    // Fetch a la API externa
    const response = await fetch(apiUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404 && breed) {
        return Response.json(
          {
            success: false,
            error: `La raza "${breed}" no fue encontrada. Verifica el nombre e intenta nuevamente.`,
          } satisfies ApiResponse,
          { status: 404 }
        );
      }
      throw new Error(`Dog API respondió con status: ${response.status}`);
    }

    const data: DogApiResponse = await response.json();

    // Verificar que la API devolvió status "success"
    if (data.status !== 'success') {
      throw new Error('La API devolvió un status no exitoso');
    }

    // La respuesta puede ser un string o un array, tomamos el primero si es array
    const imageUrl = Array.isArray(data.message) 
      ? data.message[0] 
      : data.message;

    const simplifiedResponse: ApiResponse = {
      success: true,
      data: {
        imageUrl,
        breed: breed || 'random',
        timestamp: new Date().toISOString(),
      },
    };

    console.log(`✅ Imagen de perro obtenida exitosamente`);

    return Response.json(simplifiedResponse, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('❌ Error en el endpoint:', error);

    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Error al procesar la solicitud';

    return Response.json(
      {
        success: false,
        error: process.env.NODE_ENV === 'development' 
          ? errorMessage 
          : 'Error interno del servidor',
      } satisfies ApiResponse,
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

