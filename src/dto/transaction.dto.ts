export default class TransactionDto {
    readonly userId: number;
    readonly productIds: number[]; 
    readonly tokenId?:string;
  }