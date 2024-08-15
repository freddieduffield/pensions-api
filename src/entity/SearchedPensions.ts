import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PensionProvider } from './PensionProvider';

@Entity('searched_providers')
export class SearchedPensions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  potName: string;

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

  @Column({ type: 'float' })
  annualInterestRate: number;

  @Column({ type: 'float' })
  defaultAnnualInterestRate: number;

  @OneToOne(
    () => PensionProvider,
    (pensionProvider) => pensionProvider.searchedPensions,
    { cascade: true, onDelete: 'CASCADE' }
  )
  @JoinColumn()
  pensionProvider: PensionProvider;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  employer: string;

  @UpdateDateColumn()
  foundOn: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @Column()
  monthlyPayment: number;

  @Column()
  isDraft: boolean;
}
