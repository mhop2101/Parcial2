import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoController } from './bono.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bono } from '../entities/bono.entity';
import { Usuario } from 'src/entities/usuario.entity';
@Module({
  controllers: [BonoController],
  providers: [BonoService],
  imports: [
    TypeOrmModule.forFeature([Bono, Usuario]),
  ],
})
export class BonoModule { }
