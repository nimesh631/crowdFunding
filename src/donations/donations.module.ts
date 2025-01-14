import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity/users.entity';
import { Campaigns } from 'src/campaigns/campaigns.entity/campaigns.entity';
import { Donation } from './entities/donation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Donation,User,Campaigns])],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
