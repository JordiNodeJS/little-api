/**
 * 🧪 Script de Testing para Little API
 * 
 * Este script prueba todos los endpoints de forma automática.
 * 
 * Uso:
 *   node test-api.js
 * 
 * Prerequisitos:
 *   - El servidor debe estar corriendo (pnpm dev)
 *   - Node.js 18+ instalado
 */

const BASE_URL = 'http://localhost:3000';

/**
 * Función auxiliar para testear un endpoint
 */
async function testEndpoint(name, url, expectedStatus = 200) {
  console.log(`\n🧪 Test: ${name}`);
  console.log(`📡 URL: ${url}`);
  
  try {
    const startTime = Date.now();
    const response = await fetch(url);
    const duration = Date.now() - startTime;
    
    const data = await response.json();
    
    const statusMatch = response.status === expectedStatus;
    const statusIcon = statusMatch ? '✅' : '❌';
    
    console.log(`${statusIcon} Status: ${response.status} (esperado: ${expectedStatus})`);
    console.log(`⏱️  Tiempo: ${duration}ms`);
    console.log(`📦 Response:`, JSON.stringify(data, null, 2));
    
    return { success: statusMatch, data, duration };
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    return { success: false, error };
  }
}

/**
 * Ejecutar suite completa de tests
 */
async function runTests() {
  console.log('═══════════════════════════════════════════════');
  console.log('🚀 Little API - Test Suite Completo');
  console.log('═══════════════════════════════════════════════');
  
  const tests = [
    // ==========================================
    // Tests del endpoint /api/advice
    // ==========================================
    {
      name: '✅ Get random advice',
      url: `${BASE_URL}/api/advice`,
      expectedStatus: 200
    },
    {
      name: '✅ Get advice by ID 42',
      url: `${BASE_URL}/api/advice?id=42`,
      expectedStatus: 200
    },
    {
      name: '✅ Get advice by ID 100',
      url: `${BASE_URL}/api/advice?id=100`,
      expectedStatus: 200
    },
    {
      name: '❌ Invalid ID (text)',
      url: `${BASE_URL}/api/advice?id=abc`,
      expectedStatus: 400
    },
    {
      name: '❌ Invalid ID (negative)',
      url: `${BASE_URL}/api/advice?id=-5`,
      expectedStatus: 400
    },
    {
      name: '❌ Invalid ID (zero)',
      url: `${BASE_URL}/api/advice?id=0`,
      expectedStatus: 400
    },
    {
      name: '❌ Non-existent ID',
      url: `${BASE_URL}/api/advice?id=99999`,
      expectedStatus: 404
    },
    
    // ==========================================
    // Tests del endpoint /api/dog
    // ==========================================
    {
      name: '✅ Get random dog',
      url: `${BASE_URL}/api/dog`,
      expectedStatus: 200
    },
    {
      name: '✅ Get husky image',
      url: `${BASE_URL}/api/dog?breed=husky`,
      expectedStatus: 200
    },
    {
      name: '✅ Get corgi image',
      url: `${BASE_URL}/api/dog?breed=corgi`,
      expectedStatus: 200
    },
    {
      name: '✅ Get labrador image',
      url: `${BASE_URL}/api/dog?breed=labrador`,
      expectedStatus: 200
    },
    {
      name: '✅ Get beagle image',
      url: `${BASE_URL}/api/dog?breed=beagle`,
      expectedStatus: 200
    },
    {
      name: '❌ Invalid breed',
      url: `${BASE_URL}/api/dog?breed=invalid-breed-xyz`,
      expectedStatus: 404
    },
  ];
  
  let passed = 0;
  let failed = 0;
  let totalDuration = 0;
  const results = [];
  
  for (const test of tests) {
    const result = await testEndpoint(test.name, test.url, test.expectedStatus);
    
    if (result.success) {
      passed++;
    } else {
      failed++;
    }
    
    if (result.duration) {
      totalDuration += result.duration;
    }
    
    results.push({
      name: test.name,
      success: result.success,
      duration: result.duration || 0
    });
  }
  
  // Resumen final
  console.log('\n═══════════════════════════════════════════════');
  console.log('📊 RESUMEN DE RESULTADOS');
  console.log('═══════════════════════════════════════════════');
  console.log(`✅ Tests Pasados: ${passed}`);
  console.log(`❌ Tests Fallados: ${failed}`);
  console.log(`📝 Total de Tests: ${tests.length}`);
  console.log(`⏱️  Tiempo Total: ${totalDuration}ms`);
  console.log(`⚡ Promedio: ${Math.round(totalDuration / tests.length)}ms por test`);
  
  const successRate = ((passed / tests.length) * 100).toFixed(1);
  console.log(`🎯 Tasa de Éxito: ${successRate}%`);
  
  console.log('\n═══════════════════════════════════════════════');
  
  // Mostrar tests fallidos
  if (failed > 0) {
    console.log('\n❌ TESTS FALLADOS:');
    results
      .filter(r => !r.success)
      .forEach(r => console.log(`   - ${r.name}`));
  }
  
  console.log('\n✨ Testing completado\n');
  
  // Exit code
  process.exit(failed > 0 ? 1 : 0);
}

// Verificar que el servidor esté corriendo
async function checkServer() {
  console.log('🔍 Verificando que el servidor esté corriendo...\n');
  
  try {
    const response = await fetch(BASE_URL, { method: 'HEAD' });
    console.log('✅ Servidor detectado en', BASE_URL);
    return true;
  } catch (error) {
    console.error('❌ Error: No se puede conectar al servidor');
    console.error('   Asegúrate de que el servidor esté corriendo:');
    console.error('   → pnpm dev\n');
    return false;
  }
}

// Ejecutar
(async () => {
  const serverRunning = await checkServer();
  
  if (serverRunning) {
    await runTests();
  } else {
    process.exit(1);
  }
})();

