import { Body, Controller, Get, HttpCode, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVisitDto } from './create-visit.dto';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visits: VisitsService) {}

  @Post()
  @HttpCode(204)
  @Throttle({ default: { ttl: 60_000, limit: 30 } })
  async record(@Body() dto: CreateVisitDto, @Req() req: Request) {
    await this.visits.record({
      path: dto.path,
      referrer: dto.referrer,
      ip: req.ip ?? '',
      userAgent: req.headers['user-agent'],
    });
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  stats(@Query('days', new ParseIntPipe({ optional: true })) days = 30) {
    return this.visits.stats(Math.min(Math.max(days, 1), 90));
  }
}
