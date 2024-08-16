import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn,
  TableForeignKey,
  ManyToOne,
} from 'typeorm';
import { PensionProvider } from './PensionProvider';
import { PensionPot } from './PensionPot';

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
