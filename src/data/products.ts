import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    category: 'Single Origin',
    price: 18.50,
    description: 'A bright and complex coffee from the birthplace of arabica. Grown at elevations above 1,800m in the Yirgacheffe region, this coffee offers an exquisite floral aroma with notes of bergamot, jasmine, and ripe stone fruit. The washed processing method highlights its clean, tea-like body and vibrant acidity.',
    flavor: ['Floral', 'Bergamot', 'Citrus', 'Jasmine'],
    roast: 'Light',
    weight: '250g',
    image: '🫘'
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    origin: 'Colombia',
    category: 'Single Origin',
    price: 16.00,
    description: 'Sourced from the Huila region, this Supremo grade coffee showcases the best of Colombian terroir. Hand-picked at peak ripeness and carefully washed, it delivers a beautifully balanced cup with caramel sweetness, bright citrus notes, and a smooth, velvety finish.',
    flavor: ['Caramel', 'Citrus', 'Nutty', 'Chocolate'],
    roast: 'Medium',
    weight: '250g',
    image: '☕'
  },
  {
    id: 3,
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    category: 'Single Origin',
    price: 19.00,
    description: 'A bold and earthy coffee from the volcanic soils of northern Sumatra. Processed using the traditional Giling Basah (wet-hulled) method, it develops its signature full body with low acidity, deep chocolate undertones, and hints of cedar and tobacco.',
    flavor: ['Earthy', 'Dark Chocolate', 'Cedar', 'Tobacco'],
    roast: 'Dark',
    weight: '250g',
    image: '🌋'
  },
  {
    id: 4,
    name: 'Morning Ritual Blend',
    origin: 'Brazil & Guatemala',
    category: 'Blend',
    price: 14.50,
    description: 'Our signature house blend crafted for the perfect morning cup. Brazilian Santos provides a sweet, nutty base while Guatemalan Antigua adds complexity with subtle spice and cocoa notes. Medium roasted to bring out its smooth, approachable character.',
    flavor: ['Nutty', 'Cocoa', 'Vanilla', 'Brown Sugar'],
    roast: 'Medium',
    weight: '340g',
    image: '🌅'
  },
  {
    id: 5,
    name: 'Espresso Classico',
    origin: 'Brazil, India & Ethiopia',
    category: 'Blend',
    price: 15.75,
    description: 'A meticulously crafted espresso blend designed for rich crema and intense flavor. Brazilian beans form the sweet foundation, Indian Monsooned Malabar adds body and spice, while a touch of Ethiopian natural brings fruity brightness to every shot.',
    flavor: ['Dark Chocolate', 'Spice', 'Dried Fruit', 'Toasted Almond'],
    roast: 'Dark',
    weight: '340g',
    image: '⚡'
  },
  {
    id: 6,
    name: 'Kenya AA Nyeri',
    origin: 'Kenya',
    category: 'Single Origin',
    price: 21.00,
    description: 'An exceptional AA grade coffee from the renowned Nyeri county. Grown on smallholder farms at high altitude and fully washed, this coffee is prized for its wine-like complexity. Expect bold blackcurrant acidity, tomato-like savory notes, and a sparkling, juicy finish.',
    flavor: ['Blackcurrant', 'Tomato', 'Grapefruit', 'Brown Sugar'],
    roast: 'Light',
    weight: '250g',
    image: '🍇'
  }
];

export const categories = ['All', 'Single Origin', 'Blend'];
export const roastLevels = ['All', 'Light', 'Medium', 'Dark'];
