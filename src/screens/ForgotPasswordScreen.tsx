import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from '@react-native-vector-icons/lucide';
import { FormInput } from '../components/FormInput';
import axios from 'axios';

type RootStackParamList = {
  Login: undefined;
};

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Please enter your email');
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/forgot-password`, {
        email,
      });
      Alert.alert(
        'Success',
        'Password reset instructions have been sent to your email.'
      );
      navigation.navigate('Login');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Failed', error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-5 pt-5">
      <Text className="text-3xl font-bold mb-6">Forgot Password</Text>
      <Text className="text-base text-gray-600 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </Text>

      <FormInput
        prefixIcon={<Icon name={'mail'} size={24} color="#aaa" />}
        placeholder="Enter your email"
        value={email}
        setValue={setEmail}
      />

      <TouchableOpacity
        onPress={handleForgotPassword}
        className="bg-blue-500 py-4 rounded-lg mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-bold text-lg">
            Send Reset Link
          </Text>
        )}
      </TouchableOpacity>

      <View className="flex flex-row justify-center items-center mt-8 gap-x-2">
        <Text className="text-[#575757] text-lg">Remember your password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-lg font-bold underline text-blue-500">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
