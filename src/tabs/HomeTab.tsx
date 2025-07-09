import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageSourcePropType,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { icons, images } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomSearch, ProductItem } from '../components';
import { CategoriesData } from '../constants/data';
import { removeItem } from '../utils/AsyncStorage';
import { IProduct } from '../types';
import axios from 'axios';
import Icon from '@react-native-vector-icons/lucide';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteDrawerParamList } from '../../App';

type RootStackParamList = {
  ProfileTab: undefined;
};

const HomeTab = () => {
  const stackNavigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const drawerNavigation = useNavigation<DrawerNavigationProp<RouteDrawerParamList>>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const fetchData = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:8080/api/v1/products/', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = await res.data;
      console.log('data', data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  const NavigateToProfile = async () => {
    stackNavigation.navigate('ProfileTab');
    // await removeItem('onboarded');
  };

  const handleSelectCategory = () => { };

  return (
    <ScrollView>
      {/* Header */}
      <View className="flex flex-row items-center justify-between mx-5">
        <TouchableOpacity onPress={() => drawerNavigation.openDrawer()}>
          <Icon name="menu" size={30} color="black" />
        </TouchableOpacity>


        <Image source={images.logo} resizeMode="contain" style={{ width: 75, height: 75 }} />
        <TouchableOpacity onPress={NavigateToProfile}>
          <Image source={icons.profile} className="w-10 h-10" resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <CustomSearch initialQuery="" />

      {/* Deal banner */}
      <TouchableOpacity>
        <View className="w-full  justify-between items-center border-2 border-red-500">
          <Image className=''
            style={{
              // width: '300px',
              height: '50%',
              borderRadius: 10,
            }}
            source={images.deal_off} />
        </View>
      </TouchableOpacity>


      {/* Features */}
      <View className="flex my-5 flex-row mx-5 justify-between">
        <Text className="text-2xl font-bold">Categories</Text>
        <View className="flex flex-row gap-x-3">

          <TouchableOpacity>
            <Text className='text-blue-500'>View All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View>
        <FlatList
          data={CategoriesData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleSelectCategory} >
              <Image style={{ elevation: 3, }}
                source={{ uri: item.image }}
                className="w-24 h-24 rounded-full"
              />
              <Text className="text-black-100/80 text-center text-lg font-medium mt-2">
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-8" />}
          ListFooterComponent={<View className="w-8" />}
          ListHeaderComponent={<View className="w-8" />}
        />
      </View>

      {/* Daily Deal */}
      <View className="bg-blue-500 rounded-xl justify-between items-center flex flex-row mx-5 mt-5 pl-5 py-5">
        <View>
          <Text className="text-white text-2xl font-semibold">Deal of the Day</Text>
          <View className="flex flex-row mt-3 items-center gap-x-1">
            <Image source={icons.calender} resizeMode="contain" className="w-6 h-6" />
            <Text className="text-white text-base font-medium">22h 55m 20s remaining</Text>
          </View>
        </View>
        <TouchableOpacity>
          <View className="rounded-lg border-white border-2 mr-3 h-12 px-3 flex flex-row gap-x-px items-center">
            <Text className="text-white font-medium text-lg" >View all</Text>
            <Icon name="arrow-right" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <View className="my-8">
        <FlatList
          data={products}
          renderItem={({ item }) => {
            const mainImage = item.images?.find(img => img.is_main)?.image_url || '';
            return (
              <ProductItem
                image={mainImage}
                title={item.product_name}
                description={item.description || ''}
                price={item.discounted_price || item.price}
                priceBeforeDeal={item.price}
                priceOff={
                  item.discounted_price
                    ? Math.round(((item.price - item.discounted_price) / item.price) * 100)
                    : 0
                }
                stars={4.5}
                numberOfReview={5}
                itemDetails={item}
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

      {/* Special Offer */}
      <View className="flex my-5 justify-between bg-white flex-row items-center py-3 px-4 mx-5 rounded-lg">
        <Image source={icons.offer} className="w-24 h-24" resizeMode="contain" />
        <View>
          <Text className="text-2xl mb-1 text-black-100 font-bold">Special Offers</Text>
          <Text className="text-neutral-500 text-base w-52">
            We make sure you get the offer you need at best prices
          </Text>
        </View>
      </View>

      {/* Flat Shoes */}
      <View className="my-5">
        <Image source={images.flat} className="self-center" resizeMode="contain" />
      </View>

      {/* Trending Products (reuse same products list) */}
      <View className="bg-blue-500 rounded-xl justify-between flex flex-row mx-5 pl-5 py-5">
        <View>
          <Text className="text-white text-2xl font-semibold">Trending Products</Text>
          <View className="flex flex-row mt-3 items-center gap-x-1">
            <Image source={icons.calender} resizeMode="contain" className="w-6 h-6" />
            <Text className="text-white text-base font-medium">22h 55m 20s remaining</Text>
          </View>
        </View>
        <View className="rounded-lg border-white border-2 mr-3 h-12 px-3 flex flex-row gap-x-px items-center">
          <Text className="text-white font-medium text-lg">View all</Text>
          <Image source={icons.show_all} resizeMode="contain" className="w-6 h-6" />
        </View>
      </View>

      {/* Reuse product list again */}
      <View className="my-8">
        <FlatList
          data={products}
          renderItem={({ item }) => {
            const mainImage = item.images?.find(img => img.is_main)?.image_url || '';
            return (
              <ProductItem
                image={mainImage}
                title={item.product_name}
                description={item.description || ''}
                price={item.discounted_price || item.price}
                priceBeforeDeal={item.price}
                priceOff={
                  item.discounted_price
                    ? Math.round(((item.price - item.discounted_price) / item.price) * 100)
                    : 0
                }
                stars={0}
                numberOfReview={0}
                itemDetails={item}
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
    </ScrollView>
  );
};

export default HomeTab;

type FeaturesDataProps = {
  id: number;
  title: string;
  image: ImageSourcePropType;
};

export const FeaturesData: FeaturesDataProps[] = [
  { id: 1, title: 'Sort', image: icons.sort },
  { id: 2, title: 'Filter', image: icons.filter },
];
