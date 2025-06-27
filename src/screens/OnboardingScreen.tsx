import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { images } from '../constants';
import { SplashData } from '../constants/data';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setItem } from '../utils/AsyncStorage';
import { RouteStackParamList } from '../../App';

type Props = {};
export type RootStackParamList = {
  Login: { id: number } | undefined;

};

const OnboardingScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RouteStackParamList>>();

  // useEffect(() => {
  //   setTimeout(async () => {
  //     await setItem('onboarded', 200);
  //     navigation.navigate('HomeScreen');
  //   }, 3000);
  // }, []);
  // const handleDone = async () => {
  //   await setItem('onboarded', 200);
  //   navigation.navigate('HomeScreen'); // on press will nav igate to HomeScreen
  // };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
};

export default OnboardingScreen;
