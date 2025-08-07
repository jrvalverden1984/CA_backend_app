# Configuración de Seguridad JWT en Swagger

## 1. Configuración Global (ya implementada)

La configuración global ya está implementada en `src/Swagger/swagger.ts`:

```typescript
components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'JWT token de autorización. Incluir el token en el formato: Bearer <token>'
    }
  }
},
security: [
  {
    bearerAuth: []
  }
]
```

## 2. Aplicar Seguridad a Endpoints Específicos

### Endpoint que requiere autenticación:

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

### Endpoint público (sin autenticación):

```yaml
/**
 * @swagger
 * /api/public:
 *   get:
 *     summary: Public endpoint
 *     tags: [Public]
 *     security: []  # Array vacío para indicar que no requiere autenticación
 *     responses:
 *       200:
 *         description: Success
 */
```

### Endpoint con múltiples esquemas de seguridad:

```yaml
/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Admin only endpoint
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
```

## 3. Respuestas de Error Estándar

Para endpoints protegidos, incluir siempre estas respuestas:

```yaml
responses:
  401:
    description: Unauthorized - Token inválido o expirado
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ErrorResponse'
  403:
    description: Forbidden - Sin permisos suficientes
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ErrorResponse'
```

## 4. Ejemplo Completo de Endpoint

```yaml
/**
 * @swagger
 * /company/{id}:
 *   get:
 *     summary: Get Company by ID
 *     description: Obtiene una empresa por su ID. Requiere autenticación JWT.
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanySuccess'
 *       401:
 *         description: Token de autorización inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Empresa no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
```

## 5. Cómo Usar en Swagger UI

1. Ir a `/api-docs` en tu aplicación
2. Hacer clic en el botón "Authorize" (🔒) en la parte superior
3. En el campo "bearerAuth", ingresar el token sin "Bearer " (Swagger lo agrega automáticamente)
4. Hacer clic en "Authorize"
5. Ahora todos los endpoints protegidos usarán automáticamente este token

## 6. Estructura del Token JWT

El token debe tener esta estructura:
```javascript
{
  "UserID": 123,
  "CompanyID": 456,
  "Login": "usuario@empresa.com",
  "iat": 1640995200,
  "exp": 1641081600
}
```

## 7. Testing con cURL

```bash
# Obtener token (ejemplo)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Usar token en endpoint protegido
curl -X GET http://localhost:3000/company/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```
