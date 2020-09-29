import { Category } from "src/categories/category.entity";
import { Classification } from "src/classifications/classification.entity";
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
    readonly statusID: number;
    readonly profit: number;
    readonly donation: number;  
    readonly userProfit: number;
  }