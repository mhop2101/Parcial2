import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bono } from '../entities/bono.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Bono) private bonoRepository: Repository<Bono>,
  ) { }

  async crearUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { rol, grupoInvestigacion, numeroExtension } = createUsuarioDto;

    if (rol === 'Profesor' && !['TICSW', 'IMAGINE', 'COMIT'].includes(grupoInvestigacion)) {
      throw new BadRequestException('grupo de investigacion no valido');
    }

    if (rol === 'Decana' && numeroExtension.toString().length !== 8) {
      throw new BadRequestException('extension no de 8 digitos');
    }

    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async findUsuarioById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('usr no encontrado');
    return usuario;
  }

  async eliminarUsuario(id: number): Promise<void> {
    const usuario = await this.findUsuarioById(id);

    if (usuario.rol === 'Decana') {
      throw new BadRequestException('no se puede eliminar decana');
    }

    const bonos = await this.bonoRepository.find({ where: { usuario: { id } } });
    if (bonos.length > 0) {
      throw new BadRequestException('usuario tiene bonos');
    }

    await this.usuarioRepository.delete(id);
  }
}
