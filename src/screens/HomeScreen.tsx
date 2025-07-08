import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTab, WishlistTab, CartTab, SearchTab, SettingTab } from '../tabs';
import { Image, Text, View } from 'react-native';
import { icons } from '../constants';
import { ItemDetails } from '../constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from '../api/user';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './OnboardingScreen';

type TabBarItemProps = {
  source: any; // Adjust type according to your image sources
  focused: boolean;
  cart?: boolean;
  name?: string;
};
export const TabBarItem: React.FC<TabBarItemProps> = ({ source, focused, cart, name, }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: cart ? -10 : 18, }}>
      {cart && (
          <View
            style={{
              position: 'absolute',
              top: -8,
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#000',
              opacity: 0.05,
              zIndex: -2,
            }}
          />
        )}
      
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: cart ? 64 : 'auto',
        height: cart ? 64 : 'auto',
        borderRadius: cart ? 32 : 0,
        backgroundColor: focused ? (cart ? '#2b6cb0' : 'white') : 'white',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Android
        elevation: cart ? 2 : 0,
      }}>
        
        <Image source={source}
          style={{
            tintColor: focused ? (cart ? 'white' : '#2b6cb0') : 'black',
            width: 28,
            height: 28,
          }}
        />
      </View>
      {!cart && (
        <Text
          className="font-pthin text-base"
          style={{ color: focused ? '#2b6cb0' : 'black', fontSize: 12 }}>
          {name}
        </Text>
      )}
    </View>
  );
};
type Props = {};
export type RouteTabsParamList = {
  Home: undefined;
  Wishlist: undefined;
  Cart: { itemDetails: ItemDetails } | undefined;
  Search: { query: string } | undefined;
  Setting: undefined;
};
const HomeScreen = (props: Props) => {
  const Tab = createBottomTabNavigator<RouteTabsParamList>();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // useEffect(() => {
  //     // fetch data
  //     const fetchData = async () => {
  //         try {
  //             const data = await getUserProfile();
  //             console.log("profile: ", data)
  //             if (data) {
  //                 const user = await AsyncStorage.getItem('user');
  //                 const userData = JSON.parse(user || '{}');
  //                 console.log('data', userData)
  //                 setIsAuthenticated(data !== null);
  //             } else {
  //                 setIsAuthenticated(false);
  //                 navigation.navigate('Login');
  //             }
  //         } catch (error) {
  //             setIsAuthenticated(false);
  //             navigation.navigate('Login');
  //         }
  //     };
  //     fetchData();
  // }, []);
  // console.log("isAuthenticated: ", isAuthenticated) 

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const user = await AsyncStorage.getItem('user');
  //     if (user) {
  //       console.log("user: ", user)
  //       console.log("Profile can be accessed: ")
  //       // setIsAuthenticated(true);
  //     } else {
  //       console.log("Profile cannot be accessed: ")
  //       // setIsAuthenticated(false);
  //       navigation.navigate('Login');
  //     }
  //   };
  //   checkUser();
  // }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: 'grey',
          height: 70,
          borderTopWidth: 0.2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'red',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarItem source={icons.home} focused={focused} name="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              source={icons.heart}
              focused={focused}
              name="Wishlist"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              source={icons.cart}
              focused={focused}
              cart
              name="Cart"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarItem source={icons.search} focused={focused} name="Search" />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              source={icons.setting}
              focused={focused}
              name="Setting"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
