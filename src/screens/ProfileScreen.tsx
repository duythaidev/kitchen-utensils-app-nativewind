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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem('user');
      setUser(JSON.parse(user || '{}'));
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Text>
        {JSON.stringify(user)}
      </Text>
    </View>
  );
};

export default ProfileScreen;
