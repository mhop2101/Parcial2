import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BonoService } from './bono.service';
import { CreateBonoDto } from './dto/create-bono.dto';
import { UpdateBonoDto } from './dto/update-bono.dto';

@Controller('bono')
export class BonoController {
  constructor(private readonly bonoService: BonoService) {}

  @Post()
  create(@Body() createBonoDto: CreateBonoDto) {
    return this.bonoService.create(createBonoDto);
  }

  @Get()
  findAll() {
    return this.bonoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bonoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBonoDto: UpdateBonoDto) {
    return this.bonoService.update(+id, updateBonoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bonoService.remove(+id);
  }
}
