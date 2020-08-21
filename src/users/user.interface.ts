import CreateProductDto from "src/dto/create-product.dto";

export interface UserDto {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  isActive: boolean,
  products?: CreateProductDto[]
}