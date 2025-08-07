import { CompanyEntity } from './../../Infrastructure/Entities/CompanyEntity';
import { DataSource } from 'typeorm';
//import { decrypt } from '../Utils/CryptoLib';
import CryptoLib from '../../Shared/Utils/CryptoLib';
//import { Company } from '../entities/Empresa';
//import { MainDataSource } from '../../Infrastructure/Database/main.datasource';
import { AppDataSource } from '../../Infrastructure/Database/data-source';
import { Logger } from '../../Shared/Utils/Logger';
import * as dotenv from 'dotenv';

dotenv.config();

const tenantCache = new Map<number, DataSource>();

export async function getTenantDataSource(CompanyID: number): Promise<DataSource> {

  if (tenantCache.has(CompanyID)) {
    Logger.info('📦 TypeORM connected to PostgreSQL - getTenantDataSource - tenantCache.has(CompanyID) - CompanyID: ' + CompanyID)
    return tenantCache.get(CompanyID)!;
  }

  const repo = AppDataSource.getRepository(CompanyEntity);
  const company = await repo.findOneBy({ CompanyID: CompanyID })

  if (!company) throw new Error('Empresa no encontrada');

  const crypto = new CryptoLib();
  const decryptedUrl = crypto.decryptData(company.ConnectionString);

  Logger.info('📦 TypeORM connected to PostgreSQL - getTenantDataSource - decryptedUrl: ' + decryptedUrl);
  
const isProduction = process.env.NODE_ENV === 'production';

const entitiesPath = isProduction ? 'dist/Infrastructure/**/Entities/*.js' : 'src/Infrastructure/**/Entities/*.ts';
const migrationsPath = isProduction ? 'dist/Infrastructure/Database/Migrations/*.js' : 'src/Infrastructure/Database/Migrations/*.ts';

  const ds = new DataSource({
    type: 'postgres',
    url: decryptedUrl,
    entities: [entitiesPath],
    migrations: [migrationsPath],
    synchronize: false,
  });

  await ds.initialize();
  tenantCache.set(CompanyID, ds);

  return ds;
}
