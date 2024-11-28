import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        entities: [],
        synchronize: true,
        droopSchema: true,
        keepConnectionAlive: true,
      }),
    }),
    TypeOrmModule.forFeature([]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
