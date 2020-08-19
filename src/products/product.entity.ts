import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'
import { User } from '../users/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  price: number;

  @Column({ default: true })
  available: boolean;
  @ApiProperty()

  @ApiProperty()
  userID:number;

  @ManyToOne( type => User , user  => user.products)
  user: User;
}