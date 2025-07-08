import { StyleSheet, Text, View, Image } from 'react-native';
import "./global.css"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen, LoginScreen, OnboardingScreen, PlaceOrder, ProfileScreen, SignupScreen, CheckoutScreen, ProductsDetailsScreen, ForgotPasswordScreen } from './src/screens';
import GetStartedScreen from './src/screens/GetStartedScreen';
import { ItemDetails } from './src/constants/types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MainTabs from './src/tabs/MainTabs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from './src/api/user';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './src/screens/OnboardingScreen';

export type RouteStackParamList = {
  Onboarding: undefined;
  GetStarted: undefined;
  Login: undefined;
  Signup: undefined;
  HomeScreen: undefined;
  Profile: undefined;
  Home: undefined;
  Checkout: undefined;
  PlaceOrder: { itemDetails: ItemDetails } | undefined;
  ForgotPassword: undefined;
  ProductDetails: { itemDetails: ItemDetails } | undefined;
};

const Stack = createNativeStackNavigator<RouteStackParamList>();

// const MainStack = () => (
//   <Stack.Navigator
//     screenOptions={{ headerShown: true, headerTitleAlign: 'center', headerTintColor: 'black' }}
//   >
//     <Stack.Screen name="HomeScreen" component={HomeScreen} />
//     <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
//     <Stack.Screen name="Checkout" component={CheckoutScreen} />
//     {/* <Stack.Screen name="ProductDetails" component={ProductsDetailsScreen} /> */}
//     <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

//   </Stack.Navigator>
// );
const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={MainTabs} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);


export default function App() {


  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1' edges={['right', 'left', 'top']}>
        <NavigationContainer>
          {/* {isAuthenticated ? (
            <MainTabs />
          ) : ( */}
          <MainStack />
          {/* )} */}
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}