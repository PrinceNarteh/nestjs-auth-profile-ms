import { Pool } from 'pg';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('POSTGRES_URL'),
          ssl: true,
        });

        return drizzle(pool, {
          schema,
        });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DBModule {}
