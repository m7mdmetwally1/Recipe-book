import { Ingredients } from 'src/app/shared/Ingredients';

export class Recipe {
  public name: string;
  public imagePath: string;
  public description: string;
  public ingridients: Ingredients[];

  constructor(
    name: string,
    imgPath: string,
    desc: string,
    ingridients: Ingredients[]
  ) {
    this.name = name;
    this.imagePath = imgPath;
    this.description = desc;
    this.ingridients = ingridients;
  }
}
