export class Category {
  constructor(id: number, categoryName: string, type: number, image: string) {
    this.id = id;
    this.categoryName = categoryName;
    this.type = type;
    this.image = image;
  }
  
  id!: number;
  categoryName!: string;
  type!: number;
  image!: string;
}
