import { Campaigns } from "src/campaigns/campaigns.entity/campaigns.entity";
import { User } from "src/users/users.entity/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Donation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @CreateDateColumn()
    donated_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @ManyToOne(()=>User,(user)=>user.donation)
    user:User;

    @ManyToOne(()=>Campaigns,(campaign)=>campaign.donation)
    campaign:Campaigns;
}
