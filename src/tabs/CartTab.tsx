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
  size: string;
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
        { image_url: 'https://via.placeholder.com/120x120', is_main: true },
      ],
    },
    quantity: 1,
    size: '42',
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
            <Icon name="arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-xl font-semibold text-black">Shopping Bag</Text>
          
          {/* redirect to order screen */}
          <TouchableOpacity
            // onPress={() => navigation.navigate('Order')}
          >
            <Icon name="shopping-basket" size={24} color="black" />
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
                source={{ uri: mainImage }}
                className="w-24 h-24 rounded-md"
                resizeMode="cover"
              />
              <View className="ml-4 flex-1 justify-between">
                <View>
                  <Text className="font-semibold text-base text-black">
                    {item.product.product_name}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">
                    Checked Single-Breasted Blazer
                  </Text>
                  <View className="flex-row mt-2">
                    <Text className="text-sm text-gray-800 mr-4">
                      Size {item.size}
                    </Text>
                    <Text className="text-sm text-gray-800">Qty {item.quantity}</Text>
                  </View>
                  <Text className="text-sm text-gray-600 mt-1">
                    Delivery by <Text className="font-medium">10 May 20XX</Text>
                  </Text>
                </View>
                <View className="flex-row items-center mt-2">
                  <Text className="text-lg font-bold text-black">
                    ₹{item.product.discounted_price || item.product.price}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        {/* Order Summary */}
        <View className="pt-5">
          <Text className="text-base font-semibold text-black mb-3">
            Order Payment Details
          </Text>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700">Order Amounts</Text>
            <Text className="text-black font-medium">₹{totalPrice.toLocaleString()}</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700">Convenience</Text>
            <Text className="text-red-500">Apply Coupon</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700">Delivery Fee</Text>
            <Text className="text-green-600 font-medium">Free</Text>
          </View>

          <View className="border-t border-gray-200 my-3" />

          <View className="flex-row justify-between mb-1">
            <Text className="text-black font-semibold">Order Total</Text>
            <Text className="text-black font-bold text-lg">
              ₹{totalPrice.toLocaleString()}
            </Text>
          </View>

          <Text className="text-blue-500 text-sm mb-4">EMI Available</Text>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3 flex-row justify-between items-center">
        <View>
          <Text className="text-sm text-gray-500">Total</Text>
          <Text className="text-lg font-bold text-black">
            ₹{totalPrice.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-red-500 px-6 py-3 rounded-full"
          onPress={() => navigation.navigate('Payment' as never)}
        >
          <Text className="text-white font-medium text-base">Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
