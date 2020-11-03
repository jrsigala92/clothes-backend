import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'
import { Product } from '../products/product.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Transaction extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;
  
  @Column()
  transactionDate: Date;
 
  @Column()
  productName: string;
  
  @Column()
  productId: number;

  @Column("decimal", { precision: 5, scale: 2 })
  price: number;

  @ManyToOne( type => User , user  => user.transactions )
  user: User;
}