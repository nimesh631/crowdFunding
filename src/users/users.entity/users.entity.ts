import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, OneToMany} from "typeorm";
import { UserRole } from "../dto/user-role.enum";
import { Campaigns } from "src/campaigns/campaigns.entity/campaigns.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=>Campaigns,(campaign)=>campaign.user)
    campaign: Campaigns;
    
}