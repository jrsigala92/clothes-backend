import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'
import { Product } from 'src/products/product.entity';

@Entity()
export class File extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  path: string;

  @ApiProperty()
  productId:number;
  
  @ManyToOne( type => Product , product  => product.files)
  product: Product;
}