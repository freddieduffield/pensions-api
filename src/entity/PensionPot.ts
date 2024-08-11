import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { PensionProvider } from "./PensionProvider";

@Entity('pension_pots')
export class PensionPot {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    potName: string

    @Column({type: 'float', nullable: true})
    annualInterestRate: number
    
    @Column({type: 'float'})
    defaultAnnualInterestRate: number

    @Column()
    amount: number

    @Column({nullable: true})
    employer: string

    @UpdateDateColumn()
    lastUpdatedAt: Date

    @Column({type: 'float'})
    monthlyPayment: number

    @Column()
    isWorkplacePension: boolean

    @OneToOne(() => PensionProvider, (pensionProvider) => pensionProvider.pensionPot, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    pensionProvider: PensionProvider;
}