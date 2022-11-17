import { Person } from 'src/domain/model/interface/person.interface';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { User } from '../../../domain/model/interface/users.interface';
import { ClientEntity } from './client.entity';
import { PersonEntity } from './person.entity';

@Entity()
export class UserEntity extends BaseEntity implements User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @OneToOne(() => PersonEntity)
  @JoinColumn()
  person: PersonEntity;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => ClientEntity, (clientEntity) => clientEntity.user)
  @JoinColumn()
  client: ClientEntity;

  @Column({ nullable: true })
  passwordChangeToken: string;

  @Column({ nullable: true })
  passwordChangeRequestedDate: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
