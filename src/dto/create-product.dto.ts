import { Category } from "src/categories/category.entity";
import { Classification } from "src/classifications/classification.entity";
import { Size } from "src/sizes/size.entity";
import { Status } from "src/statuses/status.entity";
import { User } from "src/users/user.entity";

export default class ProductDto {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly available: boolean;     
    readonly userID: User;  
    readonly categoryID:  Category;  
    readonly classificationID:  Classification;  
    readonly statusID: Status;
    readonly profit: number;
    readonly donation: number;  
    readonly userProfit: number;
    readonly sizeID: Size;
    readonly displayInShop: boolean;
  }