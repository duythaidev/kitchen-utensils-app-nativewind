import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from '@react-native-vector-icons/lucide';

type CustomSearchProps = {
  placeholder?: string;
  initialQuery: string;
};

type ScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Search'>;

type RootStackParamList = {
  Search: { query: string } | undefined;
};
const CustomSearch = ({ placeholder, initialQuery, } : CustomSearchProps) => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const [query, setQuery] = useState(initialQuery || '');
  const handlePress = () => {
    navigation.navigate('SearchTab', { query });
    setQuery('');
  };
  const handleKeyDown = (event: any) => {
    if (event.nativeEvent.key === 'Enter') {
      handlePress();
    }
  };

  return (
    <View className="mx-3">
      <View className="flex flex-row items-center justify-between bg-white w-full rounded-xl pr-5  h-16">
        <TouchableOpacity onPress={handlePress}>
          <Icon name="search" size={24} style={{ marginLeft: 10 }} color="#f87171" />
        </TouchableOpacity>
        <TextInput
          placeholder={placeholder || 'Search any Product..'}
          value={query}
          onChangeText={(e: string) => setQuery(e)}
          className="text-[#BBBBBB] flex-1 text-lg font-pregular bg-white"
          placeholderTextColor={'#BBBBBB'}
          onSubmitEditing={handlePress}
          onKeyPress={handleKeyDown}
        />
        <TouchableOpacity onPress={handlePress}>
          <Icon name="arrow-right" size={24} color="#f87171" />
        </TouchableOpacity>
        {/* <Image source={icons.mic} className=   "w-8 h-8" resizeMode="contain" /> */}
      </View>
    </View>
  );
};

export default CustomSearch;
