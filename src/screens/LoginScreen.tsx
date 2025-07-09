import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { icons } from '../constants';
import Icon from '@react-native-vector-icons/lucide';
import { login } from '../api/user';
import { FormInput } from '../components/FormInput';


type RootStackParamList = {
  ForgotPassword: undefined;
  Signup: undefined;
  Home: undefined;
};

type ContinueWithType = {
  image: any;
  id: number;
  name: string;
};

const ContinueWithData: ContinueWithType[] = [
  {
    id: 0,
    name: 'google',
    image: icons.google,
  },
];


const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please enter email and password');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await login(email, password);
      await AsyncStorage.setItem('access_token', data.access_token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      console.log("login success")
      navigation.replace('App');
    } catch (error: any) {
      console.log(error)
      Alert.alert('Login Failed', 'ajksdhad' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePress = async () => {
    const user = await AsyncStorage.getItem('user');
    console.log('user', user)
  };


  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem('user');
      console.log("user saved: ", JSON.parse(user || '{}'))
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-white px-5 pt-5">
      <Text className="text-4xl font-bold mb-6">Welcome Back!</Text>
      <Button title="Login" onPress={() => navigation.navigate('Home')} />
      <FormInput
        prefixIcon={<Icon name={'mail'} size={24} color="#aaa" />}
        placeholder="Email"
        value={email}
        setValue={setEmail}
      />
      

      <FormInput
        prefixIcon={<Icon name={'lock'} size={24} color="#aaa" />}
        suffixIcon={<Icon onPress={() => setShowPassword(!showPassword)} name={showPassword ? 'eye-off' : 'eye'} size={24} color="#aaa" />}
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={!showPassword}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} className="self-end mb-4" >
        <Text className="text-blue-600 font-medium text-base">
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-500 py-4 rounded-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-bold text-lg">
            Login
          </Text>
        )}
      </TouchableOpacity>

      <Text className="text-[#575757] text-lg self-center mt-10">
        - OR Continue with -
      </Text>

      <View className="flex flex-row justify-center mt-5 gap-4">
        {ContinueWithData.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => { }}
            className="rounded-full border-2 bg-blue-50 border-blue-500 p-4"
          >
            <Image source={item.image} className="w-8 h-8" />
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex flex-row justify-center items-center mt-8 gap-x-2">
        <Text className="text-[#575757] text-lg">Create An Account</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text className="text-lg font-bold underline text-blue-500">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
