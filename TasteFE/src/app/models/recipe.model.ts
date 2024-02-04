export class Recipe {
  id!: number;
  title!: string;
  method!: string;
  createdDate!: Date;
  active!: boolean;
  servings?: string;
  timeCooking?: string;
  calories?: string;
  description!: string;
  editor!: string;
  mode?: string;
  preCooking?: string;
  ingredients!: string;
  tags?: string;
}
