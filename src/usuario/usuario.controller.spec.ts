import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;

  const mockUsuarioService = {
    crearUsuario: jest.fn(),
    findUsuarioById: jest.fn(),
    eliminarUsuario: jest.fn(),
  };

  const usuario = {
    id: 1,
    cedula: 12345,
    nombre: 'Juan Pérez',
    grupoInvestigacion: 'TICSW',
    numeroExtension: 12345678,
    rol: 'Profesor',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: mockUsuarioService,
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('debería crear un usuario exitosamente', async () => {
    const dto: CreateUsuarioDto = { ...usuario };
    mockUsuarioService.crearUsuario.mockResolvedValue(usuario);

    const result = await controller.crearUsuario(dto);

    expect(result).toEqual(usuario);
    expect(mockUsuarioService.crearUsuario).toHaveBeenCalledWith(dto);
  });

  it('debería lanzar un error si el usuario no existe', async () => {
    mockUsuarioService.findUsuarioById.mockRejectedValue(new NotFoundException());

    await expect(controller.findUsuarioById(99)).rejects.toThrow(NotFoundException);
  });

  it('debería eliminar un usuario exitosamente', async () => {
    mockUsuarioService.eliminarUsuario.mockResolvedValue(undefined);

    await controller.eliminarUsuario(1);

    expect(mockUsuarioService.eliminarUsuario).toHaveBeenCalledWith(1);
  });

  it('debería lanzar un error al eliminar un usuario con restricciones', async () => {
    mockUsuarioService.eliminarUsuario.mockRejectedValue(new BadRequestException());

    await expect(controller.eliminarUsuario(1)).rejects.toThrow(BadRequestException);
  });
});
