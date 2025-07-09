import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { icons } from '../constants';
import Icon from '@react-native-vector-icons/lucide';
import Stars from '../components/Stars';

type IProduct = {
  id: number;
  product_name: string;
  price: number;
  discounted_price?: number;
  stock?: number;
  images: { image_url: string; is_main: boolean }[];
};

type ICartItem = {
  product: IProduct;
  quantity: number;
  // size: string;
};

const initialCart: ICartItem[] = [
  {
    product: {
      id: 1,
      product_name: 'Women’s Casual Wear',
      price: 7000,
      discounted_price: 7000,
      stock: 10,
      images: [
        { image_url: 'https://placehold.jp/150x150.png', is_main: true },
      ],
    },
    quantity: 1,
    // size: '42',
  },
];

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<ICartItem[]>(initialCart);

  const handleQuantityChange = (index: number, type: 'inc' | 'dec') => {
    setCartItems((prev) => {
      const updated = [...prev];
      const item = updated[index];
      if (type === 'inc' && item.quantity < (item.product.stock || 99)) {
        item.quantity += 1;
      } else if (type === 'dec' && item.quantity > 1) {
        item.quantity -= 1;
      }
      return updated;
    });
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product.discounted_price || item.product.price;
    return total + price * item.quantity;
  }, 0);
  const GoBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView className="flex-1 bg-white pt-5 px-3">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        <View className="flex flex-row justify-between items-center">
          <TouchableOpacity onPress={GoBack}>
            <Icon name="arrow-left" size={24} color="#f87171" />
          </TouchableOpacity>

          <Text className="text-xl font-semibold text-red-400">Shopping Bag</Text>

          {/* redirect to order screen */}
          <TouchableOpacity

          // onPress={() => navigation.navigate('Order')}
          >
            <Icon name="shopping-basket" size={24} color="#f87171" />
          </TouchableOpacity>

        </View>
        {cartItems.map((item, index) => {
          const mainImage =
            item.product.images?.find((img) => img.is_main)?.image_url || '';
          return (
            <View
              key={item.product.id}
              className="flex-row py-4 border-b border-gray-200"
            >
              <Image
                source={{ uri: 'https://placehold.jp/150x150.png' }}
                className="w-24 h-24 rounded-md"
                resizeMode="cover"
              />
              <View className="ml-4 flex-1 justify-between">
                <View>
                  <View className="flex-row items-center justify-between">
                    <Text className="font-semibold text-base text-black">
                      {item.product.product_name}
                    </Text>
                    <RemoveItem id={item.product.id}></RemoveItem>
                  </View>
                  <Text className="text-sm text-gray-600 mt-1">
                    {/* {item.product.description} */}
                    Checked Single-Breasted Blazer
                  </Text>
                  <Stars stars={5} numberOfReview={5} />
                  <View className="flex-row mt-2">
                    <Text className="text-sm text-gray-800">Quantity: {item.quantity}</Text>
                  </View>

                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center mt-2 gap-x-2">
                    <Text className="text-lg font-bold text-black">
                      ${item.product.discounted_price || item.product.price}
                    </Text>

                    <Text className="text-sm font-semibold text-gray-500 line-through">
                      ${item.product.price || ""}
                    </Text>

                  </View>
                  {/* + quantity - */}
                  <View className="flex-row items-center space-x-2">
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(index, 'dec')}
                      className="w-8 h-8 mr-2 bg-gray-200 rounded-full justify-center items-center"
                    >
                      <Text className="text-lg font-bold">-</Text>
                    </TouchableOpacity>

                    <Text className="text-base font-semibold ">{item.quantity}</Text>

                    <TouchableOpacity
                      onPress={() => handleQuantityChange(index, 'inc')}
                      className="w-8 h-8 ml-2 bg-gray-200 rounded-full justify-center items-center"
                    >
                      <Text className="text-lg font-bold">+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}

        {/* Order Summary */}
        <View className="pt-5">


          <View className="flex-row justify-between mb-1">
            <Text className="text-black font-semibold">Order Total</Text>
            <Text className="text-black font-bold text-lg">
              ${totalPrice.toLocaleString()}
            </Text>
          </View>

          {/* <Text className="text-blue-500 text-sm mb-4">VAT </Text> */}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-5 flex-row justify-between items-center">
        <View>
          <Text className="text-md text-gray-500">Total</Text>
          <Text className="text-xl font-bold text-red-400">
            ${totalPrice.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-red-500 px-6 py-3 rounded-xl"
          onPress={() => navigation.navigate('Payment' as never)}
        >
          <Text className="text-white font-semibold text-lg">Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const RemoveItem = ({ id }: { id: number }) => {
  const [isRemove, setIsRemove] = useState(false);
  return (
    <View>
      {!isRemove ? (
        <TouchableOpacity onPress={() => setIsRemove(true)}>
          <Icon name="trash" size={20} color="#f87171" />
        </TouchableOpacity>
      ) : (
        <View >
          <Text className='my-2'>Are you sure?</Text>
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => setIsRemove(false)}>
              <Icon name="circle-check" size={32} color="#f87171" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsRemove(false)}>
              <Icon name="circle-x" size={32} color="#f87171" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
