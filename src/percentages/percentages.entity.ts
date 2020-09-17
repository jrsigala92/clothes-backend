import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'

@Entity()
export class Percentage extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  quantity: number;
}