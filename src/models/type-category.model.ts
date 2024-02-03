import { Category } from "./category.model";

export class TypeCategory {
  constructor(id: number, name: string, image: string, categories?: Category[]) {
    this.id = id;
    this.name = name;
    this.categories = categories;
    this.image = image;
  }
  id!: number;
  name!: string;
  categories?: Category[];
  image: string;
}
