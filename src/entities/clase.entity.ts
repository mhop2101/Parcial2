import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, } from 'typeorm';

import { Usuario } from './usuario.entity';
import { Bono } from './bono.entity';

@Entity()
export class Clase {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    numeroCreditos: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.clases)
    usuario: Usuario;

    @OneToMany(() => Bono, (bono) => bono.clase)
    bonos: Bono[];
}
