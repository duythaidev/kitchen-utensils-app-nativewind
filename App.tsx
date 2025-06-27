import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import "./global.css"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen, LoginScreen, OnboardingScreen, PlaceOrder, ProfileScreen, SignupScreen, CheckoutScreen, ProductsDetailsScreen, ForgotPasswordScreen } from './src/screens';
import GetStartedScreen from './src/screens/GetStartedScreen';
import { ItemDetails } from './src/constants/types';
import { icons } from './src/constants';
import { CartTab } from './src/tabs';
import { TabBarItem } from './src/screens/HomeScreen';

export type RouteStackParamList = {
  Onboarding: undefined;
  GetStarted: undefined;
  Login: undefined;
  Signup: undefined;
  HomeScreen: undefined;
  Profile: undefined;
  Checkout: undefined;
  PlaceOrder: { itemDetails: ItemDetails } | undefined;
  ForgotPassword: undefined;
  ProductDetails: { itemDetails: ItemDetails } | undefined;
};

const Stack = createNativeStackNavigator<RouteStackParamList>();
const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, icon }: { focused: boolean; icon: any }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Image
      source={icon}
      style={{
        width: 24,
        height: 24,
        tintColor: focused ? 'red' : 'black',
        marginTop: 5,
      }}
    />
  </View>
);

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: true, headerTitleAlign: 'center', headerTintColor: 'black' }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    {/* <Stack.Screen name="ProductDetails" component={ProductsDetailsScreen} /> */}
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="GetStarted" component={GetStartedScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

export default function App() {
  // You can add authentication state here to determine which initial route to show
  const isAuthenticated = true; // Replace with your actual auth logic

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Tab.Navigator
            screenOptions={{
              headerShown: true,
              tabBarStyle: {
                height: 65,
                backgroundColor: 'white',
              }
            }}
          >
            <Tab.Screen
              name="Home"
              component={
                HomeScreen
              }
              options={{
                tabBarLabel: 'UwU',
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon focused={focused} icon={icons.home} />
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
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon focused={focused} icon={icons.profile} />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
