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
import { IProduct } from '../types';
import { icons } from '../constants';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/lucide';
import CustomSearch from '../components/CustomSearch';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2; // margin 16 + 16 + 8 spacing

const SearchProductScreen = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://10.0.2.2:8080/api/v1/products`);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item }: { item: IProduct }) => {
    const mainImage = item.images?.find(img => img.is_main)?.image_url || 'https://placehold.jp/150x150.png';
    const price = item.discounted_price || item.price;
    const priceOff =
      item.discounted_price
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
            <Text className="text-base font-bold text-orange-600">₹{price}</Text>
            {item.discounted_price && (
              <Text className="ml-2 text-sm line-through text-gray-400">₹{item.price}</Text>
            )}
          </View>
          {item.discounted_price && (
            <Text className="text-xs font-medium text-green-500">{priceOff}% OFF</Text>
          )}
          <View className="flex flex-row items-center mt-1">
            <View className="relative flex-row">
              {/* Gray stars */}
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon
                  key={`gray-${index}`}
                  name="star"
                  size={14}
                  color="#ccc"
                />
              ))}
              {/* Yellow overlay */}
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
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Search Products</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Input */}
      <View className="bg-white flex-row items-center px-3 py-2 rounded-xl mb-4">
        <Image source={icons.search} className="w-5 h-5 mr-2" />
        <TextInput
          placeholder="Search any product..."
          className="flex-1 text-base"
          value={query}
          onChangeText={setQuery}
        />
        <View className="flex flex-row gap-x-3">
          <View className="bg-white rounded-lg flex-row items-center p-2">
            <Icon name="filter" size={20} color="black" />
            <Text className="text-black-100">Filter</Text>
          </View>
        </View>
      </View>

      {/* Product Grid */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" className="mt-10" />
      ) : (
        <FlatList
          data={filteredProducts}
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
