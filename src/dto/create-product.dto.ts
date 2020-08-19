export default class CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly available: boolean;     
    readonly userID: number;
  }