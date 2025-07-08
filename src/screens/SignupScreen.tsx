import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@react-native-vector-icons/lucide';
import { icons } from '../constants';
import { FormInput } from '../components/FormInput';
import { register } from '../api/user';

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  HomeScreen: undefined;
};


const ContinueWithData = [
  {
    id: 0,
    name: 'google',
    image: icons.google,
  },
];

const SignupScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    const { email, username, password, confirmPassword } = form;

    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password does not match');
      return;
    }

    try {
      setIsSubmitting(true);
      await register(email, password);

      navigation.navigate('Login');
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      Alert.alert('Signup Failed', error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="px-5 flex-1 bg-white pt-5">
      <Text className="text-4xl font-bold mb-6">Create an Account</Text>

      <FormInput
        prefixIcon={<Icon name={'mail'} size={24} color="#aaa" />}
        placeholder="Email"
        value={form.email}
        setValue={(val) => setForm({ ...form, email: val })}
      />

      <FormInput
        prefixIcon={<Icon name={'lock'} size={24} color="#aaa" />}
        suffixIcon={
          <Icon
            onPress={() => setShowPassword(!showPassword)}
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
          />
        }
        placeholder="Password"
        value={form.password}
        setValue={(val) => setForm({ ...form, password: val })}
        secureTextEntry={!showPassword}
      />

      <FormInput
        prefixIcon={<Icon name={'lock'} size={24} color="#aaa" />}
        suffixIcon={
          <Icon
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
          />
        }
        placeholder="Confirm Password"
        value={form.confirmPassword}
        setValue={(val) => setForm({ ...form, confirmPassword: val })}
        secureTextEntry={!showConfirmPassword}
      />

      <Text className="text-[#676767] text-sm text-right mb-4">
        By clicking the <Text className="text-blue-600">Register</Text> button, you agree to our terms.
      </Text>

      <TouchableOpacity
        onPress={handleSignup}
        className="bg-blue-500 py-4 rounded-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-bold text-lg">
            Register
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
        <Text className="text-[#575757] text-lg">Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-lg font-bold underline text-blue-500">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
