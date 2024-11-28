import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, } from 'typeorm';

import { Clase } from './clase.entity';
import { Bono } from './bono.entity';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    grupoInvestigacion: string;

    @Column()
    numeroExtension: number;

    @Column({ type: 'enum', enum: ['Profesor', 'Decana'] })
    rol: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.subordinados, { nullable: true })
    jefe: Usuario;

    @OneToMany(() => Usuario, (usuario) => usuario.jefe)
    subordinados: Usuario[];

    @OneToMany(() => Clase, (clase) => clase.usuario)
    clases: Clase[];

    @OneToMany(() => Bono, (bono) => bono.usuario)
    bonos: Bono[];
}
