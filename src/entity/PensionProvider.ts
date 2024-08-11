import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { PensionPot } from './PensionPot';

@Entity('pension_providers')
export class PensionProvider {
  @PrimaryColumn()
  name: string;

  @Column()
  value: string;

  @OneToOne(() => PensionPot, (pensionPot) => pensionPot.pensionProvider)
  pensionPot: PensionPot;
}
