import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', type: 'text', nullable: false })
  email: string;

  @Column({ name: 'first_name', type: 'text', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', type: 'text', nullable: true })
  lastName?: string;

  @Column({ name: 'sso_metadata', type: 'jsonb', nullable: true })
  ssoMetadata?: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  settings?: Record<string, any>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at',type: 'timestamptz' })
  updatedAt: Date;
}
