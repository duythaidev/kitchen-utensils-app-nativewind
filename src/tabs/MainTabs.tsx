import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { CartTab, SearchTab } from '../tabs';
import HomeScreen, { TabBarItem } from '../screens/HomeScreen';
import { icons } from '../constants';
import { View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../api/user';
import { RootStackParamList } from '../screens/OnboardingScreen';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from '../screens/ProfileScreen';
import CartTab from './CartTab';
import SearchTab from '../screens/SearchProductScreen';
import HomeTab from './HomeTab';
import TabBarIcon from '../components/TabBarIcon';
// import { AuthStack } from '../../App';

export type RouteTabParamList = {
    HomeTab: undefined;
    ProfileTab: undefined;
    OrderTab: undefined;
    CartTab: undefined;
    SearchTab: { query?: string, category_id?: string } | undefined;
    ForgotPasswordTab: undefined;
};

const Tab = createBottomTabNavigator<RouteTabParamList>();



export default function MainTabs() {

    return (
        <Tab.Navigator
        //  initialRouteName='HomeTab'
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 65,
                    backgroundColor: 'white',
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeTab}
                options={{
                    tabBarLabel: 'Home',
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: '#2b6cb0',
                    },
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} icon={icons.home} className='w-8 h-8' />
                    ),
                }}
            />

            <Tab.Screen name="CartTab" component={CartTab}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <TabBarItem source={icons.cart} focused={focused} cart name="Cart" />
                    ),
                }}
            />

            <Tab.Screen name="SearchTab" component={SearchTab}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} icon={icons.profile} className='w-8 h-8' />
                    ),
                }}
            />
            <Tab.Screen name="ProfileTab" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} icon={icons.profile} className='w-8 h-8' />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

