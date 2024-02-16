// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './module/users/entities/user.entity';
import { UserModule } from './module/users/users.module';
import { UploadsModule } from './module/uploads/uploads.module';
import { AuthModule } from './auth/auth.module';

import { config } from 'dotenv'
import dotenv from 'dotenv';
import { CatalogsModule } from './module/catalogs/catalogs.module';
config();

@Module({

  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:  process.env.DB_HOST,
      port:  parseInt(process.env.DB_PORT), 
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule,
    UploadsModule, 
    CatalogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
