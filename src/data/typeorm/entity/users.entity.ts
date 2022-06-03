import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { ClientEntity } from './client.entity';
import { User } from '../../../domain/model/interface/users.interface';

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  surName: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => ClientEntity, (clientEntity) => clientEntity.users)
  clients: ClientEntity[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
