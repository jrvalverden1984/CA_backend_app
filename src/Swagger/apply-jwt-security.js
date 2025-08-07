const fs = require('fs');
const path = require('path');

// Función para aplicar seguridad JWT a un archivo de rutas
function applyJWTSecurity(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Patrón para encontrar bloques @swagger que no tengan security definido
    const swaggerBlockRegex = /(\/\*\*\s*\n\s*\*\s*@swagger\s*\n\s*\*\s*\/[^}]+)(\s*\*\/)/g;
    
    let modified = false;
    let newContent = content.replace(swaggerBlockRegex, (match, swaggerBlock, closing) => {
      // Si ya tiene security, no modificar
      if (swaggerBlock.includes('security:')) {
        return match;
      }
      
      // Si es un endpoint que no debería tener autenticación (como login), no modificar
      if (swaggerBlock.includes('/auth/') || swaggerBlock.includes('login') || swaggerBlock.includes('register')) {
        return match;
      }
      
      // Agregar security después de tags
      const securityAddition = ` *     security:
 *       - bearerAuth: []
 *     responses:
 *       401:
 *         description: Unauthorized - Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Sin permisos suficientes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'`;
      
      // Buscar donde insertar security (después de tags)
      const tagsIndex = swaggerBlock.indexOf('tags:');
      if (tagsIndex !== -1) {
        const endOfTags = swaggerBlock.indexOf('\n', tagsIndex);
        const beforeTags = swaggerBlock.substring(0, endOfTags + 1);
        const afterTags = swaggerBlock.substring(endOfTags + 1);
        
        // Buscar si ya hay responses
        const responsesIndex = afterTags.indexOf('responses:');
        if (responsesIndex !== -1) {
          // Insertar security antes de responses
          const beforeResponses = afterTags.substring(0, responsesIndex);
          const afterResponses = afterTags.substring(responsesIndex);
          
          const newSwaggerBlock = beforeTags + securityAddition + '\n *' + afterResponses;
          modified = true;
          return `/**\n * @swagger\n * ${newSwaggerBlock}${closing}`;
        } else {
          // No hay responses, agregar al final
          const newSwaggerBlock = beforeTags + securityAddition + '\n *' + afterTags;
          modified = true;
          return `/**\n * @swagger\n * ${newSwaggerBlock}${closing}`;
        }
      }
      
      return match;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Aplicada seguridad JWT a: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  No se requieren cambios en: ${filePath}`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return false;
  }
}

// Función para procesar todos los archivos de rutas
function processAllRouteFiles() {
  const routesDir = path.join(__dirname, '../Presentation/Routes');
  
  if (!fs.existsSync(routesDir)) {
    console.error('❌ Directorio de rutas no encontrado:', routesDir);
    return;
  }
  
  const files = fs.readdirSync(routesDir);
  const routeFiles = files.filter(file => file.endsWith('.routes.ts'));
  
  console.log(`🔍 Encontrados ${routeFiles.length} archivos de rutas`);
  
  let modifiedCount = 0;
  
  routeFiles.forEach(file => {
    const filePath = path.join(routesDir, file);
    if (applyJWTSecurity(filePath)) {
      modifiedCount++;
    }
  });
  
  console.log(`\n📊 Resumen:`);
  console.log(`   - Archivos procesados: ${routeFiles.length}`);
  console.log(`   - Archivos modificados: ${modifiedCount}`);
  console.log(`   - Archivos sin cambios: ${routeFiles.length - modifiedCount}`);
  
  if (modifiedCount > 0) {
    console.log(`\n🎉 ¡Seguridad JWT aplicada exitosamente!`);
    console.log(`📝 Recuerda revisar manualmente los archivos modificados para asegurar que la documentación sea correcta.`);
  }
}

// Ejecutar el script
if (require.main === module) {
  console.log('🚀 Aplicando seguridad JWT a todos los endpoints...\n');
  processAllRouteFiles();
}

module.exports = { applyJWTSecurity, processAllRouteFiles };
