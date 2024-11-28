import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) { }


}
