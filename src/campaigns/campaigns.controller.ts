import { Controller, Post, Body, Param, Put, Delete, Get, Inject } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaigns.dto';
import { UpdateCampaignsDto } from './dto/update-campaigns.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('campaigns')
export class CampaignsController {
    constructor(
         private readonly campaignsService: CampaignsService){}
    
        @Post()
        create(@Body(ValidationPipe) createCampaignDto: CreateCampaignDto){
            return this.campaignsService.create(createCampaignDto);
        }
        // 
        @Get()
        findAll(){
            return this.campaignsService.findAll();
        }

        @Get(':id')
        findOne(@Param('id') id:number){
            return this.campaignsService.findOne(id);
        }

        @Put(':id')
        update(@Param(':id')id:number, @Body() updateUserDto: UpdateCampaignsDto){
            return this.campaignsService.update(id, updateUserDto)
        }
        
        @Delete(':id')
        removeEventListener(@Param(':id') id: number){
            return this.campaignsService.remove(id);
        }
}
