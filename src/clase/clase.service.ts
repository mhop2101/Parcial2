import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Clase } from '../entities/clase.entity';
import { CreateClaseDto } from './dto/create-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(Clase) private claseRepository: Repository<Clase>,
  ) { }

  async crearClase(createClaseDto: CreateClaseDto): Promise<Clase> {
    const { codigo } = createClaseDto;

    if (codigo.length !== 10) {
      throw new BadRequestException('El código de la clase debe tener exactamente 10 caracteres.');
    }

    const clase = this.claseRepository.create(createClaseDto);
    return this.claseRepository.save(clase);
  }

  async findClaseById(id: number): Promise<Clase> {
    const clase = await this.claseRepository.findOne({ where: { id } });
    if (!clase) throw new NotFoundException(`Clase con ID ${id} no encontrada.`);
    return clase;
  }
}
