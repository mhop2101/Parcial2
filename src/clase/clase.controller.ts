import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ClaseService } from './clase.service';
import { CreateClaseDto } from './dto/create-clase.dto';

@Controller('clases')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) { }

  @Post()
  async crearClase(@Body() createClaseDto: CreateClaseDto) {
    return this.claseService.crearClase(createClaseDto);
  }

  @Get(':id')
  async findClaseById(@Param('id', ParseIntPipe) id: number) {
    const clase = await this.claseService.findClaseById(id);
    if (!clase) throw new NotFoundException(`Clase con ID ${id} no encontrada.`);
    return clase;
  }
}
