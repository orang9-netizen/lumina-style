
export enum Category {
  WOMEN_FASHION = 'Women\'s Fashion',
  ACTIVEWEAR = 'Fitness / Activewear',
  DRESSES = 'Dresses',
  TOPS_BOTTOMS = 'Tops & Bottoms',
  GYM_WEAR = 'Gym Wear',
  YOGA_FITNESS = 'Yoga & Fitness Sets',
  LINGERIE = 'Lingerie & Intimates',
  JUMPSUITS = 'Jumpsuits & Rompers'
}

export interface Product {
  id: string;
  name: string;
  price: string;
  category: Category;
  image: string;
  description: string;
  fabric: string;
  care: string;
  colors: string[];
}
