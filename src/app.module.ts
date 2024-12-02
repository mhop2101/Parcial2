import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoModule } from './bono/bono.module';
import { ClaseModule } from './clase/clase.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './entities/usuario.entity';
import { Bono } from './entities/bono.entity';
import { Clase } from './entities/clase.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: '34.66.204.134',
        port: 5432,
        username: 'tecweb',
        password: 'tecwebtecweb',
        database: 'Parcial2',
        entities: [Usuario, Bono, Clase],
        synchronize: true,
        droopSchema: true,
        keepConnectionAlive: true,
      }),
    }),
    TypeOrmModule.forFeature([Usuario, Bono, Clase]),
    BonoModule,
    ClaseModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
