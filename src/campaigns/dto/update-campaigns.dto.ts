import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignDto } from './create-campaigns.dto';

export class UpdateCampaignsDto extends PartialType(CreateCampaignDto) {}
