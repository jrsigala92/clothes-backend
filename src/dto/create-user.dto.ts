export default class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly isActive: boolean;
    readonly products: number[] 
  }