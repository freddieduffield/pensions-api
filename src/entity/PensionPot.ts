import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PensionProvider } from './PensionProvider';
import { SearchedPensions } from './SearchedPensions';

@Entity('pension_pots')
export class PensionPot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  potName: string;

  @Column({ type: 'float', nullable: true })
  annualInterestRate: number;

  @Column({ type: 'float' })
  defaultAnnualInterestRate: number;

  @Column()
  amount: number;

  @Column({ nullable: true })
  employer: string;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @Column({ type: 'float' })
  monthlyPayment: number;

  @Column({ nullable: true })
  isWorkplacePension: boolean;

  @OneToOne(
    () => PensionProvider,
    (pensionProvider) => pensionProvider.pensionPot,
    { cascade: true, onDelete: 'CASCADE' }
  )
  @JoinColumn()
  pensionProvider: PensionProvider;

  @OneToMany(
    () => SearchedPensions,
    (searchedPensions) => searchedPensions.pensionPot
  )
  searchedPensions: SearchedPensions[];
}
