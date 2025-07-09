import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { icons, images } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomSearch, ProductItem } from '../components';
import { CategoriesData } from '../constants/data';
import { removeItem } from '../utils/AsyncStorage';
import { ICategory, IProduct } from '../types';
import axios from 'axios';
import Icon from '@react-native-vector-icons/lucide';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteDrawerParamList } from '../../App';

import CarouselBanner from '../components/Carousel';
import Deal from '../components/Deal';
import ProductList from '../components/ProductList';
import { RouteTabParamList } from './MainTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';


type RootStackParamList = {
  ProfileTab: undefined;
};

const HomeTab = () => {
  const stackNavigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const drawerNavigation = useNavigation<DrawerNavigationProp<RouteDrawerParamList>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<RouteTabParamList>>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:8080/api/v1/products?limit=6', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const categoriesRes = await axios.get('http://10.0.2.2:8080/api/v1/categories?limit=6', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = await res.data.data;
      const categoriesData = await categoriesRes.data.data;
      // console.log('data', data);
      setProducts(data);
      setCategories(categoriesData);
      setIsLoading(false);
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

  const handleSelectCategory = (category: ICategory) => {
    console.log('category', category);
    // drawerNavigation.navigate('CategoryTab', { category });
  };


  return (
    <ScrollView>
      {/* Header */}


      <View className="flex flex-row items-center justify-between mx-5">
        <TouchableOpacity onPress={() => drawerNavigation.openDrawer()}>
          <Icon name="menu" size={30} color="#f87171" />
        </TouchableOpacity>


        <Image source={images.logo} resizeMode="contain" style={{ width: 75, height: 75 }} />
        <TouchableOpacity onPress={NavigateToProfile}>
          <Image source={icons.profile} className="w-10 h-10" resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <CustomSearch initialQuery="" />

      {/* Carousel */}
      <CarouselBanner />

      {/* Categories */}
      <View className="flex my-5 flex-row mx-5 justify-between">
        <Text className="text-2xl font-bold">Categories</Text>
        <View className="flex flex-row gap-x-3">

          <TouchableOpacity onPress={() => tabNavigation.navigate('SearchTab', { category: 'a' })}>
            <Text className='text-red-400'>View All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#f87171" />
        ) : (
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectCategory(item)} >
                <View className="w-24 h-24 rounded-full"
                  style={{ elevation: 3 }}
                >
                  <Image className="w-24 h-24 rounded-full"
                    source={{ uri: item.image_url || 'https://placehold.jp/600x400' }}
                  />
                </View>

                <Text className="text-red-400 text-center text-lg font-medium mt-2">
                  {item.category_name}
                </Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-8" />}
            ListFooterComponent={<View className="w-6" />}
            ListHeaderComponent={<View className="w-6" />}
          />
        )}
      </View>

      {/* Daily Deal */}
      <Deal title="Deal of the Day" time="22h 55m 20s remaining" onPress={() => { }} />

      {/* Product List */}
      <ProductList products={products} />

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


      <Deal title="Trending Products" time="22h 55m 20s remaining" onPress={() => { }} />


      <ProductList products={products} />
    </ScrollView>
  );
};

export default HomeTab;


