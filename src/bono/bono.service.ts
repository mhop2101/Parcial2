import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Bono } from '../entities/bono.entity';
import { CreateBonoDto } from './dto/create-bono.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Clase } from '../entities/clase.entity';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(Bono) private bonoRepository: Repository<Bono>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Clase) private claseRepository: Repository<Clase>,

  ) { }

  async crearBono(createBonoDto: CreateBonoDto): Promise<Bono> {
    const { monto, usuarioId } = createBonoDto;

    if (!monto || monto <= 0) {
      throw new BadRequestException('monto invalido');
    }

    const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) throw new NotFoundException(`usuario no encontrado`);
    if (usuario.rol !== 'Profesor') {
      throw new BadRequestException('usuario no es profesor');
    }

    const bono = this.bonoRepository.create(createBonoDto);
    const clase = await this.claseRepository.findOne({ where: { id: createBonoDto.claseId } });
    bono.clase = clase;
    bono.usuario = usuario;
    return this.bonoRepository.save(bono);
  }

  async findAllBonosByClaseCodigo(codigo: string): Promise<Bono[]> {
    const bonos = await this.bonoRepository.find({
      where: { clase: { codigo } },
      relations: ['clase'],
    });

    if (bonos.length === 0) {
      throw new NotFoundException(`no se encontraron bonos`);
    }

    return bonos;
  }

  async findAllBonosByUsuario(userId: number): Promise<Bono[]> {
    const bonos = await this.bonoRepository.find({ where: { usuario: { id: userId } } });
    if (bonos.length === 0) {
      throw new NotFoundException(`no se encontraron bonos`);
    }
    return bonos;
  }

  async deleteBono(id: number): Promise<void> {
    const bono = await this.bonoRepository.findOne({ where: { id: id } });

    if (bono.calificacion > 4) {
      throw new BadRequestException('no se puede eliminar bono con calificacion mayor a 4');
    }
    await this.bonoRepository.delete(id);
  }
}
