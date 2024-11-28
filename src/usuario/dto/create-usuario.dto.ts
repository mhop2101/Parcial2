import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUsuarioDto {
    @IsInt()
    cedula: number;

    @IsString()
    nombre: string;

    @IsString()
    grupoInvestigacion: string;

    @IsInt()
    numeroExtension: number;

    @IsEnum(['Profesor', 'Decana'])
    rol: string;

    @IsOptional()
    @IsInt()
    jefeId?: number;
}
