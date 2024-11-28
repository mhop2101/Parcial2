import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateBonoDto {
    @IsInt()
    monto: number;

    @IsNumber()
    calificacion: number;

    @IsString()
    palabraClave: string;

    @IsInt()
    usuarioId: number;

    @IsInt()
    claseId: number;
}
