import { Request, Response, NextFunction } from 'express';
import { getTenantDataSource } from '../Common/tenant.datasource';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../Errors/UnauthorizedError';

interface JWTPayload {
  UserID: number;
  CompanyID: number;
  Login: string;
  iat: number;
  exp: number;
}

export async function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token de autorización requerido');
    }

    const token = authHeader.substring(7); // Remover 'Bearer ' del inicio
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no está configurado');
    }

    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    
    // Extraer CompanyID del token
    const CompanyID = decoded.CompanyID;

    if (!CompanyID) {
      throw new UnauthorizedError('CompanyID no encontrado en el token');
    }

    // Obtener la conexión de base de datos para el tenant
    const dataSource = await getTenantDataSource(CompanyID);
    (req as any).tenantDb = dataSource;
    
    // Opcional: Agregar información del usuario al request para uso posterior
    (req as any).user = {
      UserID: decoded.UserID,
      CompanyID: decoded.CompanyID,
      Login: decoded.Login
    };
    
    next();
  } catch (err) {
    console.error('Error en tenant middleware:', err);
    
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        message: 'Token inválido o expirado',
        error: err.message 
      });
    }
    
    if (err instanceof UnauthorizedError) {
      return res.status(err.status).json({ 
        message: err.message 
      });
    }
    
    res.status(500).json({ 
      message: 'Error obteniendo conexión de empresa',
      error: err instanceof Error ? err.message : 'Error desconocido'
    });
  }
}
