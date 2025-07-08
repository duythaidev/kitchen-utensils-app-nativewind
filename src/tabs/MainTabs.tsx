import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ForgotPasswordScreen, HomeScreen, LoginScreen, ProfileScreen, SignupScreen } from '../screens';
import { CartTab } from '../tabs';
import { TabBarItem } from '../screens/HomeScreen';
import { icons } from '../constants';
import { View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../api/user';
import { RootStackParamList } from '../screens/OnboardingScreen';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthStack } from '../../App';

export type RouteTabParamList = {
    HomeScreen: undefined;
    Profile: undefined;
    Checkout: undefined;
    Cart: undefined;
    ForgotPassword: undefined;
};

const Tab = createBottomTabNavigator<RouteTabParamList>();

const TabBarIcon = ({ focused, icon, className }: { focused: boolean; icon: any, className: string }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={icon} className={className} style={{ tintColor: focused ? '#2b6cb0' : 'black' }} />
    </View>
);

export default function MainTabs() {

    return (
        <Tab.Navigator initialRouteName='HomeScreen'
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 65,
                    backgroundColor: 'white',
                }
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen}
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

            <Tab.Screen name="Cart" component={CartTab}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <TabBarItem source={icons.cart} focused={focused} cart name="Cart" />
                    ),
                }}
            />

            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} icon={icons.profile} className='w-8 h-8' />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

