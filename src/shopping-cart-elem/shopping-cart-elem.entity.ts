import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'

@Entity()
export class ShoppingCartElem extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  productId: string;

  @ApiProperty()
  @Column()
  userId: string;

  @ApiProperty()
  @Column("decimal", { precision: 5, scale: 2 })
  price: string;
  
  @ApiProperty()
  @Column()
  name: string;
}