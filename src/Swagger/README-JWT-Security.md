# Configuración de Seguridad JWT en Swagger

## ✅ Configuración Completada

La configuración de seguridad JWT ya está implementada en tu aplicación. Aquí está el resumen de lo que se ha configurado:

### 1. Middleware de Tenant Actualizado
- ✅ Modificado `src/Shared/Middleware/tenant.middleware.ts`
- ✅ Ahora extrae `CompanyID` del token JWT en lugar del header directo
- ✅ Valida la caducidad del token automáticamente
- ✅ Maneja errores de token inválido/expirado

### 2. Configuración de Swagger Actualizada
- ✅ Configurado esquema de seguridad JWT en `src/Swagger/swagger.ts`
- ✅ Agregada configuración global de seguridad
- ✅ Documentación de ejemplo creada

## 🚀 Cómo Usar

### 1. Obtener un Token JWT
```bash
# Ejemplo de login (ajusta según tu endpoint de autenticación)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@empresa.com",
    "password": "password"
  }'
```

### 2. Usar el Token en las Peticiones
```bash
# Ejemplo de petición a endpoint protegido
curl -X GET http://localhost:3000/company/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3. Usar en Swagger UI
1. Ir a `http://localhost:3000/api-docs`
2. Hacer clic en el botón "Authorize" (🔒)
3. En el campo "bearerAuth", ingresar solo el token (sin "Bearer ")
4. Hacer clic en "Authorize"
5. ¡Listo! Todos los endpoints protegidos usarán automáticamente este token

## 📝 Aplicar Seguridad a Endpoints Existentes

### Opción 1: Automática (Recomendada)
Ejecutar el script que aplica seguridad JWT a todos los endpoints:

```bash
cd src/Swagger
node apply-jwt-security.js
```

### Opción 2: Manual
Para cada endpoint que requiera autenticación, agregar en la documentación Swagger:

```yaml
/**
 * @swagger
 * /api/resource:
 *   get:
 *     summary: Get resource
 *     tags: [Resource]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized - Token inválido o expirado
 *       403:
 *         description: Forbidden - Sin permisos suficientes
 */
```

## 🔧 Configuración Técnica

### Estructura del Token JWT
El token debe tener esta estructura:
```javascript
{
  "UserID": 123,
  "CompanyID": 456,
  "Login": "usuario@empresa.com",
  "iat": 1640995200,  // issued at
  "exp": 1641081600   // expiration
}
```

### Variables de Entorno Requeridas
```env
JWT_SECRET=tu_secreto_jwt_muy_seguro
```

### Middleware de Tenant
El middleware ahora:
1. ✅ Extrae el token del header `Authorization: Bearer <token>`
2. ✅ Valida la firma y caducidad del token
3. ✅ Extrae el `CompanyID` del payload
4. ✅ Obtiene la conexión de base de datos correspondiente
5. ✅ Agrega información del usuario a `req.user`

## 📋 Endpoints que NO Requieren Autenticación

Los siguientes endpoints típicamente NO deberían tener autenticación JWT:
- `/auth/login` - Login de usuarios
- `/auth/register` - Registro de usuarios
- `/auth/refresh` - Renovación de tokens
- `/health` - Health check
- `/api-docs` - Documentación de Swagger

Para estos endpoints, usar:
```yaml
security: []  # Array vacío indica que no requiere autenticación
```

## 🧪 Testing

### 1. Token Válido
```bash
curl -X GET http://localhost:3000/company/1 \
  -H "Authorization: Bearer <token_válido>"
# Respuesta esperada: 200 OK
```

### 2. Token Inválido
```bash
curl -X GET http://localhost:3000/company/1 \
  -H "Authorization: Bearer token_invalido"
# Respuesta esperada: 401 Unauthorized
```

### 3. Token Expirado
```bash
curl -X GET http://localhost:3000/company/1 \
  -H "Authorization: Bearer <token_expirado>"
# Respuesta esperada: 401 Unauthorized
```

### 4. Sin Token
```bash
curl -X GET http://localhost:3000/company/1
# Respuesta esperada: 401 Unauthorized
```

## 🔍 Troubleshooting

### Error: "JWT_SECRET no está configurado"
```bash
# Agregar a tu archivo .env
JWT_SECRET=tu_secreto_jwt_muy_seguro
```

### Error: "Token de autorización requerido"
- Verificar que el header `Authorization` esté presente
- Verificar que el formato sea `Bearer <token>`

### Error: "Token inválido o expirado"
- Verificar que el token sea válido
- Verificar que no haya expirado
- Verificar que la firma sea correcta

### Error: "CompanyID no encontrado en el token"
- Verificar que el token contenga el campo `CompanyID`
- Verificar que el valor no sea `null` o `undefined`

## 📚 Archivos Modificados

1. `src/Shared/Middleware/tenant.middleware.ts` - Middleware principal
2. `src/Swagger/swagger.ts` - Configuración de Swagger
3. `src/Presentation/Routes/company.routes.ts` - Ejemplo de endpoint protegido

## 📖 Documentación Adicional

- Ver `src/Swagger/Examples/jwt-security-examples.md` para más ejemplos
- Ver `src/Swagger/apply-jwt-security.js` para el script de automatización

## 🎯 Próximos Pasos

1. ✅ Ejecutar el script de automatización para aplicar seguridad a todos los endpoints
2. ✅ Revisar manualmente los endpoints de autenticación para asegurar que NO tengan seguridad JWT
3. ✅ Probar los endpoints con tokens válidos e inválidos
4. ✅ Actualizar la documentación de la API para incluir ejemplos de autenticación
