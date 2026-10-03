import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('visits')
export class Visit {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() path: string;
  @Column({ type: 'varchar', nullable: true }) referrer: string | null;
  @Column({ type: 'varchar', nullable: true }) userAgent: string | null;
  @Index() @Column() visitorHash: string;
  @Index() @CreateDateColumn() createdAt: Date;
}
