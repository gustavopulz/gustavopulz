import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  findByEmail(email: string) {
    return this.repo.findOneBy({ email: email.toLowerCase() });
  }

  async onApplicationBootstrap() {
    if ((await this.repo.count()) > 0) return;
    const email = this.config.getOrThrow<string>('ADMIN_EMAIL').toLowerCase();
    const password = this.config.getOrThrow<string>('ADMIN_PASSWORD');
    await this.repo.save({ email, passwordHash: await hash(password, 12) });
    this.logger.log(`Admin user created: ${email}`);
  }
}
