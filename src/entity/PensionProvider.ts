import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PensionPot } from './PensionPot';

@Entity('pension_providers')
export class PensionProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  value: string;

  @OneToMany(() => PensionPot, (pensionPot) => pensionPot.pensionProvider)
  pensionPot: PensionPot;
}
