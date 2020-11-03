import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'

@Entity()
export class ShoppingCartElem extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  productId: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column("decimal", { precision: 5, scale: 2 })
  price: number;
  
  @ApiProperty()
  @Column()
  name: string;
}