import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaigns } from './campaigns.entity/campaigns.entity';
import { User } from 'src/users/users.entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaigns,User])],
  providers: [CampaignsService],
  controllers: [CampaignsController]
})
export class CampaignsModule {}
