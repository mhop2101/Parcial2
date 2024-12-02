import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  async crearUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.crearUsuario(createUsuarioDto);
  }


  @Get(':id')
  async findUsuarioById(@Param('id', ParseIntPipe) id: number) {
    const usuario = await this.usuarioService.findUsuarioById(id);
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    return usuario;
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminarUsuario(@Param('id', ParseIntPipe) id: number) {
    await this.usuarioService.eliminarUsuario(id);
  }
}
