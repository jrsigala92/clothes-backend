import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'
import { User } from '../users/user.entity';
import { Category } from 'src/categories/category.entity';
import { Status } from 'src/statuses/status.entity';
import { Classification } from 'src/classifications/classification.entity';
import { Size } from 'src/sizes/size.entity';

@Entity()
export class Product extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column("decimal", { precision: 5, scale: 2 })
  price: number;
  
  @Column("decimal", { precision: 5, scale: 2 , nullable:true})
  profit: number;

  @Column("decimal", { precision: 5, scale: 2 , nullable:true})
  donation: number;

  @Column("decimal", { precision: 5, scale: 2 , nullable:true})
  userProfit: number;

  @ApiProperty()
  @Column({default:false, nullable:true})
  displayInShop: boolean;

  @Column({ default: true })
  available: boolean;  
  
  @Column({nullable:true, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty()
  userID:number;
  
  @ApiProperty()
  classificationID:number;

  @ApiProperty()
  sizeID:number;
  
  @ApiProperty()
  categoryID:number;
  
  @ApiProperty()
  statusID:number;

  @ApiProperty()
  buyerID:number;

  @ManyToOne( type => User , user  => user.products)
  user: User;

   @ManyToOne( type => User , buyer  => buyer.products, {nullable: true})
  buyer: User;

  @ManyToOne( type => Category , category  => category.products)
  category: Category;
  
  @ManyToOne( type => Size , size  => size.products)
  size: Size;

  @ManyToOne( type => Status , status  => status.products)
  status: Status;
  
  @ManyToOne( type => Classification , classification  => classification.products, {nullable: true})
  classification: Classification;
}