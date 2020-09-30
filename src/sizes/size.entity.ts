import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'
import { Product } from '../products/product.entity';

@Entity()
export class Size extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany( type => Product , product => product.size)
  products: Product[];
}