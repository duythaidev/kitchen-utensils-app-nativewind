import { StyleSheet, Text, View, Image } from 'react-native';
import "./global.css"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GetStartedScreen from './src/screens/GetStartedScreen';
import { ItemDetails } from './src/constants/types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import MainTabs from './src/tabs/MainTabs';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from './src/api/user';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './src/screens/OnboardingScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductsDetailsScreen from './src/screens/ProductsDetailsScreen';
import SignupScreen from './src/screens/SignupScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CartTab from './src/tabs/CartTab';
import { TabBarItem } from './src/screens/HomeScreen';
import { icons } from './src/constants';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeTab from './src/tabs/HomeTab';
import SearchProductScreen from './src/screens/SearchProductScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteTabParamList } from './src/tabs/MainTabs';

export type RouteStackParamList = {
  App: undefined;
  GetStarted: undefined;
  Login: undefined;
  Signup: undefined;
  HomeScreen: undefined;
  Profile: undefined;
  Home: undefined;
  Checkout: undefined;
  ForgotPassword: undefined;
  DrawerStack: undefined;
  ProductDetails: { itemDetails: ItemDetails } | undefined;
};

export type RouteDrawerParamList = {
  HomeDrawer: undefined;
  CartDrawer: undefined;
  SearchDrawer: undefined;
  ProfileDrawer: undefined;
};

const Stack = createNativeStackNavigator<RouteStackParamList>();
const Drawer = createDrawerNavigator<RouteDrawerParamList>();
const Tab = createBottomTabNavigator<RouteTabParamList>();


const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>

    <Stack.Screen name="App" component={DrawerStack} />
    <Stack.Screen name="ProductDetails" component={ProductsDetailsScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

export const DrawerStack = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Home" >
      {() => <MainTabs initialTab="HomeTab" />}
    </Drawer.Screen>
    <Drawer.Screen name="Search">
      {() => <MainTabs initialTab="SearchTab" />}
    </Drawer.Screen>
    <Drawer.Screen name="Cart">
      {() => <MainTabs initialTab="CartTab" />}
    </Drawer.Screen>
    <Drawer.Screen name="Profile">
      {() => <MainTabs initialTab="ProfileTab" />}
    </Drawer.Screen>
  </Drawer.Navigator>
  
  );
  
  

export const MainTabs = ({ initialTab = "HomeTab" }: { initialTab?: keyof RouteTabParamList }) => {
  return (
    <Tab.Navigator
      initialRouteName={initialTab}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 65, backgroundColor: 'white' },
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeTab} />
      <Tab.Screen name="CartTab" component={CartTab} />
      <Tab.Screen name="SearchTab" component={SearchProductScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};




export default function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1' edges={['right', 'left', 'top']}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}