import {ImageSourcePropType} from 'react-native';
import { IProductImage } from '../types';
import { ICategory } from '../types';

type SplashTypes = {
  image: ImageSourcePropType;
  title: string;
  description: string;
};

type FeaturesTypes = {
  image: string;
  title: string;
};
type ItemDetails = ProductTypes;
type ProductTypes = {
  id: number,
  product_name: string,
  price: number,
  stock: number,
  discounted_price?: number | null,
  description?: string | null,
  category?: ICategory | null,
  images?: IProductImage[] | null,
};
type TabBarTypes = {
  title?: string;
  image: string;
  link: string;
  inActiveColor: string;
  activeColor: string;
  inActiveBGColor?: string;
  activeBGColor?: string;
};

export type {
  SplashTypes,
  FeaturesTypes,
  ProductTypes,
  TabBarTypes,
  ItemDetails,
};
