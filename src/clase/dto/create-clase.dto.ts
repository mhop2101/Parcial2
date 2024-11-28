import { IsInt, IsString } from 'class-validator';

export class CreateClaseDto {
    @IsString()
    nombre: string;

    @IsString()
    codigo: string;

    @IsInt()
    numeroCreditos: number;

    @IsInt()
    usuarioId: number;
}
