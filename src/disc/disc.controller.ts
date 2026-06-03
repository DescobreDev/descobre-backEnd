import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { DiscService } from './disc.service';
import { SubmitDiscDto } from './dto/submit-disc.dto';
import { CandidateAuthGuard } from 'src/candidate-auth/guards/candidate-auth.guard';

@Controller('disc')
@UseGuards(CandidateAuthGuard)
export class DiscController {
    constructor(private readonly discService: DiscService) { }

    @Get('questions')
    getQuestions() {
        return this.discService.getQuestions();
    }

    @Post('submit')
    submit(@Req() req: any, @Body() dto: SubmitDiscDto) {
        return this.discService.submit(req.user.id, dto);
    }
}