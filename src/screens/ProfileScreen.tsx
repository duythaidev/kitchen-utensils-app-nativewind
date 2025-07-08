import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { logout } from '../api/user';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const ProfileScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        console.log("user: ", user)
        console.log("Profile can be accessed: ")
        setIsAuthenticated(true);
      } else {
        console.log("Profile cannot be accessed: ")
        setIsAuthenticated(false);
        navigation.navigate('Login');
      }
    };
    checkUser();
  }, []);

  console.log("isAuthenticated: ", isAuthenticated)
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
