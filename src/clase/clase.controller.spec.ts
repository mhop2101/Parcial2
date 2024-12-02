import { Test, TestingModule } from '@nestjs/testing';
import { ClaseController } from './clase.controller';
import { ClaseService } from './clase.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { NotFoundException } from '@nestjs/common';

describe('ClaseController', () => {
  let controller: ClaseController;
  let service: ClaseService;

  const mockClaseService = {
    crearClase: jest.fn(),
    findClaseById: jest.fn(),
  };

  const clase = {
    id: 1,
    nombre: 'Matemáticas',
    codigo: 'CLASE12345',
    numeroCreditos: 3,
    usuarioId: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaseController],
      providers: [
        {
          provide: ClaseService,
          useValue: mockClaseService,
        },
      ],
    }).compile();

    controller = module.get<ClaseController>(ClaseController);
    service = module.get<ClaseService>(ClaseService);
  });

  it('debería crear una clase exitosamente', async () => {
    const dto: CreateClaseDto = { ...clase };
    mockClaseService.crearClase.mockResolvedValue(clase);

    const result = await controller.crearClase(dto);

    expect(result).toEqual(clase);
    expect(mockClaseService.crearClase).toHaveBeenCalledWith(dto);
  });

  it('debería lanzar un error si la clase no existe', async () => {
    mockClaseService.findClaseById.mockRejectedValue(new NotFoundException());

    await expect(controller.findClaseById(99)).rejects.toThrow(NotFoundException);
  });
});
