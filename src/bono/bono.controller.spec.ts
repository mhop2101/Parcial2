import { Test, TestingModule } from '@nestjs/testing';
import { BonoController } from './bono.controller';
import { BonoService } from './bono.service';
import { CreateBonoDto } from './dto/create-bono.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BonoController', () => {
  let controller: BonoController;
  let service: BonoService;

  const mockBonoService = {
    crearBono: jest.fn(),
    findBonoByCodigo: jest.fn(),
    findAllBonosByUsuario: jest.fn(),
    findAllBonosByClaseCodigo: jest.fn(),
    deleteBono: jest.fn(),
  };

  const bono = {
    id: 1,
    monto: 1000,
    calificacion: 3.5,
    palabraClave: 'excelente',
    usuario: { id: 1 },
    clase: { id: 1, codigo: 'CLASE12345' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BonoController],
      providers: [
        {
          provide: BonoService,
          useValue: mockBonoService,
        },
      ],
    }).compile();

    controller = module.get<BonoController>(BonoController);
    service = module.get<BonoService>(BonoService);
  });

  it('debería crear un bono exitosamente', async () => {
    const dto: CreateBonoDto = {
      ...bono,
      usuarioId: bono.usuario.id,
      claseId: bono.clase.id
    };
    mockBonoService.crearBono.mockResolvedValue(bono);

    const result = await controller.crearBono(dto);

    expect(result).toEqual(bono);
    expect(mockBonoService.crearBono).toHaveBeenCalledWith(dto);
  });



  it('debería buscar bonos por código de clase', async () => {
    mockBonoService.findAllBonosByClaseCodigo.mockResolvedValue([bono]);

    const result = await controller.findAllBonosByClaseCodigo('CLASE12345');

    expect(result).toEqual([bono]);
    expect(mockBonoService.findAllBonosByClaseCodigo).toHaveBeenCalledWith('CLASE12345');
  });

  it('debería eliminar un bono exitosamente', async () => {
    mockBonoService.deleteBono.mockResolvedValue(undefined);

    await controller.deleteBono(1);

    expect(mockBonoService.deleteBono).toHaveBeenCalledWith(1);
  });

  it('debería lanzar un error al intentar eliminar un bono con restricciones', async () => {
    mockBonoService.deleteBono.mockRejectedValue(new BadRequestException());

    await expect(controller.deleteBono(1)).rejects.toThrow(BadRequestException);
  });
});
