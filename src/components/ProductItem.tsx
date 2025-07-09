import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteStackParamList } from '../../App';
import { IProduct } from '../types';
import Icon from '@react-native-vector-icons/lucide';

type ProductItemProps = {
  image: string;
  title: string;
  description: string;
  price: number;
  priceBeforeDeal: number;
  priceOff: number; // đổi sang number để tính phần trăm
  stars: number;
  numberOfReview: number;
  itemDetails: IProduct;
};

const ProductItem: React.FC<ProductItemProps> = ({
  image,
  title,
  description,
  price,
  priceBeforeDeal,
  priceOff,
  stars,
  numberOfReview,
  itemDetails,
}) => {
  const navigation = useNavigation<StackNavigationProp<RouteStackParamList, 'ProductDetails'>>();

  const NavigateToProductsDetails = () => {
    navigation.navigate('ProductDetails', { itemDetails });
  };

  return (
    <TouchableOpacity
      className="w-72 bg-white rounded-xl"
      onPress={NavigateToProductsDetails}>
      <Image source={{ uri: image }} className="w-full h-40 rounded-t-xl" />
      <View className="px-3">
        <Text className="text-2xl text-black-100 my-2 font-bold">{title}</Text>
        <Text className="text-base text-black-100/50 mb-1">{description}</Text>

        <Text className="text-black-100 font-bold text-xl">${price}</Text>

        <View className="flex flex-row items-center gap-x-3">
          {price !== priceBeforeDeal && (
            <>
              <Text className="text-black-100/50 font-thin text-base line-through">
                ${priceBeforeDeal}
              </Text>
              <Text className="text-action font-thin text-base">{priceOff}% OFF</Text>
            </>
          )}
        </View>
        <View className="flex flex-row items-center my-2">
          {/* Nền: 5 sao xám */}
          <View className="relative flex flex-row">
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon key={index} name="star" size={18} color="gray" />
            ))}

            {/* Sao vàng chồng lên, width = stars / 5 */}
            <View style={{
              position: 'absolute',
              flexDirection: 'row',
              overflow: 'hidden',
              width: `${(stars / 5) * 100}%`, // phần trăm width theo số sao
            }}
              pointerEvents="none" // không ảnh hưởng đến thao tác chạm
            >
              {Array.from({ length: Math.ceil(stars) }).map((_, index) => 
                  index === Math.ceil(stars)
                    ?
                    stars % 1 !== 0 && <Icon key={index} name="star-half" size={18} color="gold" />
                    :
                    <Icon key={index} name="star" size={18} color="gold" />
                )
              }
            </View>
          </View>


          <Text className="text-base font-light ml-2 text-black-100/90">
            ({numberOfReview})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
