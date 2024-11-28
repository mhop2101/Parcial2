import { Controller, Post, Get, Delete, Param, Body, NotFoundException, ParseIntPipe, HttpCode, HttpStatus, } from '@nestjs/common';
import { BonoService } from './bono.service';
import { CreateBonoDto } from './dto/create-bono.dto';

@Controller('bonos')
export class BonoController {
  constructor(private readonly bonoService: BonoService) { }

  @Post()
  async crearBono(@Body() createBonoDto: CreateBonoDto) {
    return this.bonoService.crearBono(createBonoDto);
  }

  @Get('clase/:codigo')
  async findAllBonosByClaseCodigo(@Param('codigo') codigo: string) {
    return this.bonoService.findAllBonosByClaseCodigo(codigo);
  }

  @Get('usuario/:userId')
  async findAllBonosByUsuario(@Param('userId', ParseIntPipe) userId: number) {
    return this.bonoService.findAllBonosByUsuario(userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBono(@Param('id', ParseIntPipe) id: number) {
    await this.bonoService.deleteBono(id);
  }
}
