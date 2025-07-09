import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { RouteStackParamList } from '../../App';
import { icons } from '../constants';
import { RouteTabsParamList } from './HomeScreen';
import ProductItem from '../components/ProductItem';
import { IProduct } from '../types';
import Icon from '@react-native-vector-icons/lucide';
type ScreenRouteProps = RouteProp<RouteStackParamList, 'ProductDetails'>;

type ProductDetailsProps = {
  route: ScreenRouteProps;
};

const ProductsDetailsScreen = ({ route }: ProductDetailsProps) => {
  const { itemDetails } = route.params || {};
  const navigation =
    useNavigation<StackNavigationProp<RouteTabsParamList, 'Cart'>>();

  const GoBack = () => {
    navigation.goBack();
  };

  const NavigateToCart = () => {
    navigation.navigate('App', { itemDetails: itemDetails! });
  };

  const item = itemDetails;

  const mainImage = itemDetails?.images?.find(img => img.is_main)?.image_url ?? '';
  const price = itemDetails?.discounted_price ?? itemDetails?.price;
  const priceOff = itemDetails?.discounted_price
    ? Math.round(((itemDetails?.price - itemDetails?.discounted_price) / itemDetails?.price) * 100)
    : 0;

  return (
    <ScrollView className="pt-5 px-3">
      {/* Header */}
      <View className="flex flex-row justify-between items-center">
        <TouchableOpacity onPress={GoBack}>
          <Icon name="arrow-left" size={30} color="#f87171" />
          {/* <Image source={icons.next1} className="rotate-180 w-8 h-8" resizeMode="contain" /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={NavigateToCart}>
          <Icon name="shopping-cart" size={30} color="#f87171" />
          {/* <Image source={icons.cart} className="w-6 h-6" resizeMode="contain" /> */}
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <View className="mt-5">
        <Image source={{ uri: mainImage }} className="h-72 rounded-2xl" />
      </View>

      {/* Size */}
      <View className="mt-4">
        <Text className="text-black-100 text-lg font-bold">Size: 7UK</Text>
        <View className="flex flex-row gap-x-5 mt-5 items-center">
          {/* {sizeData.map(item => (
            <View
              key={item?.id}
              className="bg-transparent py-1 px-2 rounded-lg border border-blue-500">
              <Text className="text-action text-xl font-medium">{item?.size} UK</Text>
            </View>
          ))} */}
        </View>
      </View>

      {/* Product Info */}
      <View className="mt-5 ">
        <Text className="text-2xl font-bold text-black-100">
          {itemDetails?.product_name}
        </Text>
        <Text className="text-neutral-400 font-medium text-lg">
          Vision Alta Men’s Shoes Size (All Colours)
        </Text>
        <View className="flex flex-row items-center mb-3 mt-2">
          <AirbnbRating
            count={5}
            defaultRating={0}
            showRating={false}
            size={20}
            isDisabled
            ratingContainerStyle={{ flexDirection: 'row' }}
          />
          <Text className="text-xl font-thin text-black-100/90 ml-2">(0)</Text>
        </View>

        <View className="flex flex-row items-center gap-x-3">
          <Text className="text-black-100 font-bold text-2xl">${price}</Text>
          {itemDetails?.discounted_price && (
            <>
              <Text className="text-black-100/50 font-thin text-xl line-through">
                ${itemDetails?.price}
              </Text>
              <Text className="text-action font-thin text-xl">{priceOff}% OFF</Text>
            </>
          )}
        </View>

        <View className="mt-3">
          <Text className="text-xl font-semibold text-black-100">Product Details</Text>
          <Text className="text-md font-medium text-neutral-400">
            {itemDetails?.description}
          </Text>
        </View>

        {/* Status */}
        <View className="flex flex-row items-center gap-x-3 mt-5">
          <FlatList
            data={StatusData}
            renderItem={({ item }) => (
              <View className="bg-transparent py-1 px-2 border flex flex-row gap-x-1 rounded-lg border-neutral-500">
                <Image className="w-6 h-6" resizeMode="contain" source={item?.icon} />
                <Text className="text-neutral-400 font-medium text-lg">{item?.name}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-3" />}
          />
        </View>

        {/* Action Buttons */}
        <View className="flex flex-row gap-x-5 items-center mt-5">
          <View className="flex flex-row items-center">
            {/* <Image source={icons.cart_circle} className="w-12 h-12 -mr-1 z-20" resizeMode="contain" /> */}
            <TouchableOpacity>
              <View className="flex flex-row items-center bg-blue-600 py-3 px-5 rounded-xl z-10">
                <Icon name="shopping-cart" size={30} color="white" />
                <Text className="ml-2 text-white font-medium text-2xl">Add To Cart</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center">
            <TouchableOpacity>
              <View className="flex flex-row items-center bg-green-500 py-3 px-5 rounded-xl z-10">
                <Icon name="shopping-basket" size={30} color="white" />
                <Text className="ml-2 text-white font-medium text-2xl">Buy Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Time */}
        <View className="bg-blue-300 px-3 py-3 my-5">
          <Text className="text-black-100 text-lg">Delivery in</Text>
          <Text className="text-black-100 text-2xl font-bold">1 Hour</Text>
        </View>

        {/* Similar Actions */}
        <View className="flex flex-row items-center justify-between mb-8">
          <FlatList
            data={similarData}
            renderItem={({ item }) => (
              <View className="bg-white py-3 px-3 rounded-lg border border-neutral-200 flex flex-row gap-x-2">
                <Image source={item?.icon} className="w-6 h-6" resizeMode="contain" />
                <Text className="text-black-100 text-xl font-medium">{item?.name}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-3" />}
          />
        </View>

        {/* Similar Products Title */}
        <View className="mb-5">
          <Text className="text-2xl text-black-100 font-bold">Similar To</Text>
          <View className="flex my-5 flex-row mx-5 justify-between">
            <Text className="text-2xl font-bold">282+ Items</Text>
            <View className="flex flex-row gap-x-3">
              {/* {FeaturesData.map(item => ( */}
              <View
                className="bg-white rounded-lg flex-row items-center px-2"
                key={item?.id}>
                <Text className="text-black-100">{item?.title}</Text>
                <Icon name="arrow-right" size={20} color="black" />
              </View>
              {/* ))} */}
            </View>
          </View>
        </View>

        {/* Similar Products */}
        <View className="my-8">
          <FlatList
            data={[itemDetails]}
            renderItem={({ item }) => {
              const mainImage = item?.images?.find(img => img.is_main)?.image_url || '';
              const price = item?.discounted_price ?? item?.price;
              const priceOff = item?.discounted_price
                ? Math.round(((item?.price - item?.discounted_price) / item?.price) * 100)
                : 0;
              return (
                <ProductItem
                  image={mainImage}
                  title={item?.product_name || ''}
                  description={item?.description || ''}
                  price={price || 0}
                  priceBeforeDeal={item?.price || 0}
                  priceOff={priceOff}
                  stars={0}
                  numberOfReview={0}
                  itemDetails={item as IProduct}
                />
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-8" />}
            ListFooterComponent={<View className="w-8" />}
            ListHeaderComponent={<View className="w-8" />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductsDetailsScreen;

// Supporting Data

interface similarDataType {
  icon: ImageSourcePropType;
  name: string;
}

const similarData: similarDataType[] = [
  { icon: icons.eye, name: 'View Similar' },
  { icon: icons.components, name: 'Add to Compare' },
];

const sizeData = [
  { id: 0, size: 6 },
  { id: 1, size: 7 },
  { id: 2, size: 8 },
  { id: 3, size: 9 },
  { id: 4, size: 10 },
];

interface StatusDataType {
  id: number;
  icon: ImageSourcePropType;
  name: string;
}

const StatusData: StatusDataType[] = [
  { id: 0, icon: icons.lock, name: 'Nearest Store' },
  { id: 1, icon: icons.lock, name: 'VIP' },
  { id: 2, icon: icons.lock, name: 'Return policy' },
];
