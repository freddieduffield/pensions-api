import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PensionPot } from './PensionPot';
import { SearchedPensions } from './SearchedPensions';

@Entity('pension_providers')
export class PensionProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  value: string;

  @OneToOne(() => PensionPot, (pensionPot) => pensionPot.pensionProvider)
  pensionPot: PensionPot

  @OneToOne(() => SearchedPensions, (searchedPensions) => searchedPensions.pensionProvider)
  searchedPensions: PensionPot
}
