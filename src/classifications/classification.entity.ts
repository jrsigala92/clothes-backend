import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'
import { Product } from '../products/product.entity';

@Entity()
export class Classification extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @OneToMany( type => Product , product => product.classification)
  products: Product[];
}