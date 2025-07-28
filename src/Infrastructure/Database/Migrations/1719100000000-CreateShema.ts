import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateShema1719100000000 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`)   
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`select 'NO SE PUEDE ELIMINAR EL SHEMA [Payroll]'`)
  }
}
