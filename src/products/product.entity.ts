import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'
import { User } from '../users/user.entity';
import { Category } from 'src/categories/category.entity';
import { Status } from 'src/statuses/status.entity';

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
  
  @ApiProperty()
  categoryID:number;
  
  @ApiProperty()
  statusID:number;

  @ManyToOne( type => User , user  => user.products)
  user: User;

  @ManyToOne( type => Category , category  => category.products)
  category: Category;

  @ManyToOne( type => Status , status  => status.products)
  status: Status;
}