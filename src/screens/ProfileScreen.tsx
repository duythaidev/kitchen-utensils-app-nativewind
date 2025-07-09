import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { icons } from '../constants';
import { CustomButton, CustomWrapper } from '../components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteStackParamList } from '../../App';
import { FormInput } from '../components/FormInput';
import Icon from '@react-native-vector-icons/lucide';

const SettingTab = () => {
  const navigation = useNavigation<StackNavigationProp<RouteStackParamList>>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Editable fields
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    // Fake profile
    const data = {
      email: 'test@test.com',
      phone: '1234567890',
      address: '1234 Main St, Anytown, USA',
    };
    setUserData(data);
    setPhone(data.phone);
    setAddress(data.address);
  }, []);

  useEffect(() => {
    if (!userData) return;
    const changed =
      phone !== userData.phone ||
      address !== userData.address;

    setIsChanged(changed);
  }, [phone, address]);

  const handleEditPic = () => { };

  const handleSaveChanges = () => {
    if (password || confirmPassword) {
      if (password.length < 6) {
        return Alert.alert("Password must be at least 6 characters.");
      }
      if (password !== confirmPassword) {
        return Alert.alert("Passwords do not match.");
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setUserData((prev: any) => ({
        ...prev,
        phone,
        address,
      }));
      setPassword('');
      setConfirmPassword('');
      setIsSubmitting(false);
      setIsChanged(false);
      Alert.alert("Success", "Profile updated!");
    }, 1000);
  };

  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <CustomWrapper>
      <View className="pt-2 px-3">
        {/* image profile */}
        <View className="flex justify-center items-center">
          <Image source={icons.profile} className="w-40 h-40 rounded-full" />
          <TouchableOpacity
            onPress={handleEditPic}
            className="p-2 border-white border rounded-full bg-blue-500 absolute bottom-3 right-[31%] items-center justify-center"
          >
            <Image source={icons.pen} className="w-6 h-6" />
          </TouchableOpacity>
        </View>

        {/* Personal Details */}
        <View className="mt-4">
          <Text className="text-2xl font-bold text-black-100">Personal Details</Text>

          <FormInput
            value={userData?.email}
            setValue={() => { }}
            placeholder="Email Address"
            prefixIcon={<Icon name="mail" size={20} color="#f87171" />}
            disabled={true}
            className="mt-4 bg-white rounded-lg"
          />

          <FormInput
            value={phone}
            setValue={setPhone}
            placeholder="Phone Number"
            prefixIcon={<Icon name="phone" size={20} color="#f87171" />}
            className="bg-white rounded-lg"
          />
        </View>

        <View className="h-px w-full my-5 bg-black-100/20" />

        {/* Address Info */}
        <View>
          <Text className="text-2xl font-bold text-black-100">Address Details</Text>
          <FormInput
            value={address}
            setValue={setAddress}
            placeholder="Address"
            prefixIcon={<Icon name="map-pin" size={20} color="#f87171" />}
            className="mt-4 bg-white rounded-lg"
          />
        </View>

        {isChanged && (
          <CustomButton
            title="Save Changes"
            handlePress={() => { }}
            isLoading={isSubmitting}
            containerStyle=" bg-blue-500 py-5"
          />

        )}
        <View className="h-px w-full my-5 bg-black-100/20" />
        {/* Save Changes */}


        <CustomButton
          title="Logout"
          handlePress={() => { }}
          isLoading={isSubmitting}
          containerStyle=" py-5"
        />
        <View className="h-px w-full my-5 bg-black-100/20" />

        {/* Change Password */}
        <View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-black-100">Change Password</Text>
            <Button title={`${showChangePassword ? 'Hide' : 'Show'}`}
              color={showChangePassword ? 'red' : '#f87171'}

              onPress={() => setShowChangePassword(!showChangePassword)} />
          </View>
          {showChangePassword && (
            <>
              <FormInput
                value={password}
                setValue={setPassword}
                placeholder="Old Password"
                secureTextEntry
                prefixIcon={<Icon name="lock" size={20} color="#f87171" />}
                className="mt-2 bg-white rounded-lg"
              />
              <FormInput
                value={newPassword}
                setValue={setNewPassword}
                placeholder="New Password"
                secureTextEntry
                prefixIcon={<Icon name="lock" size={20} color="#f87171" />}
                className=" bg-white rounded-lg"
              />
              <FormInput
                value={confirmPassword}
                setValue={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
                prefixIcon={<Icon name="lock" size={20} color="#f87171" />}
                className=" bg-white rounded-lg"
              />
              {isChanged && (
                <CustomButton
                  title="Change Password"
                  handlePress={() => { }}
                  isLoading={isSubmitting}
                  containerStyle="py-5"
                />
              )}
            </>
          )}
        </View>



      </View>
    </CustomWrapper>
  );
};

export default SettingTab;
