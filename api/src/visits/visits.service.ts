import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { Visit } from './visit.entity';

const DAY_MS = 86_400_000;

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(Visit) private readonly repo: Repository<Visit>,
    private readonly config: ConfigService,
  ) {}

  async record(input: { path: string; referrer?: string; ip: string; userAgent?: string }) {
    const day = new Date().toISOString().slice(0, 10);
    const salt = this.config.getOrThrow<string>('IP_HASH_SALT');
    const visitorHash = createHash('sha256')
      .update(`${salt}|${day}|${input.ip}|${input.userAgent ?? ''}`)
      .digest('hex');
    await this.repo.insert({
      path: input.path,
      referrer: input.referrer || null,
      userAgent: input.userAgent?.slice(0, 300) ?? null,
      visitorHash,
    });
  }

  async stats(days: number) {
    const since = new Date(Date.now() - (days - 1) * DAY_MS);
    since.setUTCHours(0, 0, 0, 0);

    const [totals, daily, topPaths, topReferrers] = await Promise.all([
      this.repo
        .createQueryBuilder('v')
        .select('COUNT(*)', 'views')
        .addSelect('COUNT(DISTINCT v."visitorHash")', 'visitors')
        .where('v."createdAt" >= :since', { since })
        .getRawOne<{ views: string; visitors: string }>(),
      this.repo
        .createQueryBuilder('v')
        .select(`TO_CHAR(v."createdAt" AT TIME ZONE 'UTC', 'YYYY-MM-DD')`, 'date')
        .addSelect('COUNT(*)', 'views')
        .addSelect('COUNT(DISTINCT v."visitorHash")', 'visitors')
        .where('v."createdAt" >= :since', { since })
        .groupBy('date')
        .getRawMany<{ date: string; views: string; visitors: string }>(),
      this.repo
        .createQueryBuilder('v')
        .select('v.path', 'path')
        .addSelect('COUNT(*)', 'views')
        .where('v."createdAt" >= :since', { since })
        .groupBy('v.path')
        .orderBy('views', 'DESC')
        .limit(5)
        .getRawMany<{ path: string; views: string }>(),
      this.repo
        .createQueryBuilder('v')
        .select('v.referrer', 'referrer')
        .addSelect('COUNT(*)', 'views')
        .where('v."createdAt" >= :since AND v.referrer IS NOT NULL', { since })
        .groupBy('v.referrer')
        .orderBy('views', 'DESC')
        .limit(5)
        .getRawMany<{ referrer: string; views: string }>(),
    ]);

    const byDate = new Map(daily.map((d) => [d.date, d]));
    const series = Array.from({ length: days }, (_, i) => {
      const date = new Date(since.getTime() + i * DAY_MS).toISOString().slice(0, 10);
      const row = byDate.get(date);
      return { date, views: Number(row?.views ?? 0), visitors: Number(row?.visitors ?? 0) };
    });

    return {
      days,
      views: Number(totals?.views ?? 0),
      visitors: Number(totals?.visitors ?? 0),
      series,
      topPaths: topPaths.map((p) => ({ path: p.path, views: Number(p.views) })),
      topReferrers: topReferrers.map((r) => ({ referrer: r.referrer, views: Number(r.views) })),
    };
  }
}
