import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { PensionPot } from '../pension-pots/PensionPot';

@Entity('searched_pensions')
export class SearchedPensions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PensionPot, pensionPot => pensionPot.searchedPensions)
  @JoinColumn({ name: 'pensionPotId' })
  pensionPot: PensionPot;

  @Column({ nullable: true })
  pensionPotId: string;

  @Column({ nullable: true })
  policyNumber: number;

  @Column({ nullable: true })
  annualFee: number;

  @Column({enum: ['FOUND', 'NOT_FOUND']})
  status: string;

  @Column({ nullable: true })
  previousName: string;

  @Column({ nullable: true })
  previousAddress: string;

  @UpdateDateColumn()
  foundOn: Date;

  @Column()
  isDraft: boolean;
}
