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
import { useNavigation } from '@react-navigation/native';
import { IProduct, ICategory } from '../types';
import { icons } from '../constants';
import Icon from '@react-native-vector-icons/lucide';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const SearchProductScreen = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [priceSort, setPriceSort] = useState<'lth' | 'htl' | ''>('');
  const [loading, setLoading] = useState(false);
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
    } catch (error) {
      console.error('Fetch products error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:8080/api/v1/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Fetch categories error:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [keyword, selectedCategory, priceSort]);

  const renderItem = ({ item }: { item: IProduct }) => {
    const mainImage = item.images?.find(img => img.is_main)?.image_url || 'https://placehold.jp/150x150.png';
    const price = item.discounted_price || item.price;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
        <View style={{ width: ITEM_WIDTH }} className="p-3 rounded-xl mb-4 bg-white shadow">
          <Image
            source={{ uri: mainImage }}
            style={{ width: '100%', height: 120, borderRadius: 12 }}
            resizeMode="cover"
          />
          <Text className="mt-2 font-semibold text-base text-black" numberOfLines={1}>
            {item.product_name}
          </Text>
          <Text className="text-sm text-gray-500" numberOfLines={2}>
            {item.description}
          </Text>
          <Text className="text-base font-bold text-orange-600">₹{price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-5">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Search Products</Text>
        <View style={{ width: 24 }} />
      </View>

      <View className="bg-white flex-row items-center px-3 py-2 rounded-xl mb-4">
        <Image source={icons.search} className="w-5 h-5 mr-2" />
        <TextInput
          placeholder="Search..."
          className="flex-1 text-base"
          value={keyword}
          onChangeText={setKeyword}
        />
      </View>

      <View className="bg-white px-3 py-3 rounded-xl mb-4">
        <Text className="font-semibold mb-2">Filter</Text>
        <Text className="text-sm mb-1 text-gray-600">Category</Text>
        <Picker
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
          selectedValue={priceSort}
          onValueChange={val => setPriceSort(val)}
        >
          <Picker.Item label="Default" value="" />
          <Picker.Item label="Low to High" value="lth" />
          <Picker.Item label="High to Low" value="htl" />
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" className="mt-10" />
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
