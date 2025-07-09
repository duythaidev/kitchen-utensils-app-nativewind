import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IProduct, ICategory } from '../types';
import { icons } from '../constants';
import Icon from '@react-native-vector-icons/lucide';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const SearchProductScreen = () => {

  const route = useRoute();
  const { query } = route.params || { query: '' };
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [keyword, setKeyword] = useState(query || '');
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [priceSort, setPriceSort] = useState<'lth' | 'htl' | ''>('');
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (keyword) params.keyword = keyword;
      if (selectedCategory) params.category = selectedCategory;
      if (priceSort) params.priceSort = priceSort;

      const res = await axios.get('http://10.0.2.2:8080/api/v1/products', {
        params,
      });
      setProducts(res.data.data);
      // console.log('products', res.data.data);
    } catch (error) {
      console.error('Fetch products error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:8080/api/v1/categories');
      setCategories(res.data.data);
    } catch (err) {
      console.error('Fetch categories error:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    setKeyword(query);
  }, [query]);

  useEffect(() => {
    fetchProducts();
  }, [keyword, selectedCategory, priceSort ]);

  // console.log('selectedCategory', selectedCategory, priceSort);


  // const renderItem = ({ item }: { item: IProduct }) => {
  //   const mainImage = item.images?.find(img => img.is_main)?.image_url || 'https://placehold.jp/150x150.png';
  //   const price = item.discounted_price || item.price;

  //   return (
  //     <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
  //       <View style={{ width: ITEM_WIDTH }} className="p-3 rounded-xl mb-4 bg-white shadow">
  //         <Image
  //           source={{ uri: mainImage }}
  //           style={{ width: '100%', height: 120, borderRadius: 12 }}
  //           resizeMode="cover"
  //         />
  //         <Text className="mt-2 font-semibold text-base text-black" numberOfLines={1}>
  //           {item.product_name}
  //         </Text>
  //         <Text className="text-sm text-gray-500" numberOfLines={2}>
  //           {item.description}
  //         </Text>
  //         <Text className="text-base font-bold text-orange-600">₹{price}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
  const renderItem = ({ item }: { item: IProduct }) => {
    // const navigation = useNavigation();

    const mainImage = item.images?.find(img => img.is_main)?.image_url || 'https://placehold.jp/150x150.png';
    const price = item.discounted_price || item.price;
    const priceOff = item.discounted_price
      ? Math.round(((item.price - item.discounted_price) / item.price) * 100)
      : 0;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
        <View
          className=" p-3 rounded-xl mb-4 bg-white"
          style={{ width: ITEM_WIDTH, elevation: 2 }}
        >

          <Image
            source={{ uri: mainImage || 'https://placehold.jp/150x150.png' }}
            style={{ width: '100%', height: 120, borderRadius: 12 }}
            resizeMode="cover"
          />
          <Text className="mt-2 font-semibold text-base text-black" numberOfLines={1}>
            {item.product_name}
          </Text>
          <Text className="text-sm text-gray-500" numberOfLines={2}>
            {item.description}
          </Text>
          <View className="flex flex-row items-center mt-1">
            <Text className="text-base font-bold text-orange-600">${price}</Text>
            {item.discounted_price && (
              <Text className="ml-2 text-sm line-through text-gray-400">${item.price}</Text>
            )}
          </View>
          {item.discounted_price && (
            <Text className="text-xs font-pthin text-red-500">{priceOff}% OFF</Text>
          )}
          <View className="flex flex-row items-center mt-1">
            <View className="relative flex-row">
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon
                  key={`gray-${index}`}
                  name="star"
                  size={14}
                  color="#ccc"
                />
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  overflow: 'hidden',
                  width: `${(item.stars || 0) * 20}%`, // 5 stars = 100%
                }}
                pointerEvents="none"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    key={`yellow-${index}`}
                    source={icons.star}
                    style={{ width: 14, height: 14, tintColor: '#facc15' }}
                  />
                ))}
              </View>
            </View>
            <Text className="ml-1 text-xs text-gray-600">({item.numberOfReview || 0})</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1 bg-gray-100 px-4 pt-5">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#f87171" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-red-400">Search Products</Text>
        <View style={{ width: 24 }} />
      </View>

      <View className="flex-row items-center justify-between mb-4 ]">
        <View
          className="bg-white flex-row w-[82%] h-[55px] items-center px-3 py-2 rounded-xl">
          <Icon name="search" className='mr-2' size={24} color="#f87171" />
          <TextInput
            placeholder="Search product..."
            className="flex-1 text-base"
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>
        <TouchableOpacity
          onPress={() => setShowFilter(!showFilter)}
        >
          <View
            className="px-3 py-2 h-[55px] w-[55px] rounded-xl flex items-center justify-center bg-white">
            <Icon name={showFilter ? "x" : "filter"} size={30} color="#f87171" />
          </View>
        </TouchableOpacity>
      </View>

      {showFilter && (
        <View style={{ borderColor: '#f87171', borderWidth: 1, elevation: 3 }}
          className="bg-white px-3 py-3 rounded-xl mb-4">
          <Text className="font-semibold text-xl mb-2">Filter</Text>
          <Text className="text-sm mb-1 text-gray-600">Category</Text>
          <Picker
            style={{ backgroundColor: '#eee' }}
            selectedValue={selectedCategory}
            onValueChange={val => setSelectedCategory(val)}
          >
            <Picker.Item label="All categories" value="" />
            {categories.map(cat => (
              <Picker.Item key={cat.id} label={cat.category_name} value={cat.id} />
            ))}
          </Picker>

          <Text className="text-sm mt-2 mb-1 text-gray-600">Sort by Price</Text>
          <Picker
            style={{ backgroundColor: '#eee' }}
            selectedValue={priceSort}
            onValueChange={val => setPriceSort(val)}
          >
            <Picker.Item label="Default" value="" />
            <Picker.Item label="Low to High" value="lth" />
            <Picker.Item label="High to Low" value="htl" />
          </Picker>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#f87171" className="mt-10" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-20">No products found.</Text>
          }
        />
      )}
    </View>
  );

};



export default SearchProductScreen;
