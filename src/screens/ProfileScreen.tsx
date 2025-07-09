import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
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
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<any>(null);

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
      address !== userData.address ||
      avatarUri !== null;

    setIsChanged(changed);
  }, [phone, address, avatarUri]);

  const handleEditPic = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const picked = result.assets[0];
      setAvatarUri(picked.uri);
      setAvatarFile({
        uri: picked.uri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      });
    }
  };

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

    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('address', address);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    setTimeout(() => {
      setUserData((prev: any) => ({
        ...prev,
        phone,
        address,
      }));
      setPassword('');
      setConfirmPassword('');
      setAvatarUri(null);
      setAvatarFile(null);
      setIsSubmitting(false);
      setIsChanged(false);
      Alert.alert("Success", "Profile updated!");
    }, 1000);
  };

  const [showChangePassword, setShowChangePassword] = useState(false);

  const GoBack = () => {
    navigation.goBack();
  };

  const NavigateToCart = () => {
    navigation.navigate('Cart');
  };
  return (
    <CustomWrapper>
      <View className="pt-2 px-3">
        <View className="flex flex-row justify-between items-center">
          <TouchableOpacity onPress={GoBack}>
            <Icon name="arrow-left" size={30} color="#f87171" />
            {/* <Image source={icons.next1} className="rotate-180 w-8 h-8" resizeMode="contain" /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={NavigateToCart}>
            <Icon name="shopping-cart" size={30} color="#f87171" />
            {/* <Image source={icons.cart} className="w-6 h-6" resizeMode="contain" /> */}
          </TouchableOpacity>
        </View>
        {/* image profile */}
        <View className="flex justify-center items-center">
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} className="w-40 h-40 rounded-full" />
          ) : (
            <Image source={icons.profile} className="w-40 h-40 rounded-full" />
          )}
          <TouchableOpacity
            onPress={handleEditPic}
            className="p-2 border-white border rounded-full bg-blue-500 absolute bottom-3 right-[31%] items-center justify-center"
          >
            <Image source={icons.pen} className="w-6 h-6" />
          </TouchableOpacity>
        </View>
        <View className="mt-4  justify-center items-center">
          <View>
            <Text className="text-2xl font-bold ">{userData?.user_name || 'N/A'}</Text>
          </View>

          <View>
            <Text className="text-xl font-light ">{userData?.role || 'Customer'}</Text>

          </View>
        </View>
        <View>

          <FormInput
            value={userData?.email}
            style={{ borderColor: '#f87171' }}

            setValue={() => { }}
            placeholder="Email Address"
            prefixIcon={<Icon name="mail" size={26} color="#f87171" />}
            disabled={true}
            className="mt-4 bg-white rounded-lg "
          />

          <FormInput
            value={phone}
            style={{ borderColor: '#f87171' }}
            setValue={setPhone}
            placeholder="Phone Number"
            prefixIcon={<Icon name="phone" size={26} color="#f87171" />}
            className="bg-white rounded-lg"
          />
          <FormInput
            value={address}
            style={{ borderColor: '#f87171' }}
            setValue={setAddress}
            placeholder="Address"
            prefixIcon={<Icon name="map-pin" size={26} color="#f87171" />}
            className=" bg-white rounded-lg"
          />
        </View>


        {isChanged && (
          <TouchableOpacity onPress={() => { }}
            style={{ borderColor: '#f87171', elevation: 3 }}
            className=" flex flex-row justify-center items-center bg-white text-red-400 border  py-5 rounded-xl">
            <Text className="text-red-400 font-bold text-2xl">Save Changes</Text>
          </TouchableOpacity>
        )}

        <View className="h-px w-full my-5 bg-black-100/20" />

        <TouchableOpacity onPress={() => { }}
          style={{ borderColor: '#f87171', elevation: 3 }}
          className=" flex flex-row justify-center items-center bg-white text-red-400 border  py-5 rounded-xl">
          <Text className="text-red-400 font-bold text-2xl">Logout</Text>
        </TouchableOpacity>

        <View className="h-px w-full my-5 bg-black-100/20" />

        {/* Change Password */}
        <View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-red-400">Change Password</Text>
            <Button
              title={`${showChangePassword ? 'Hide' : 'Show'}`}
              color={showChangePassword ? 'red' : '#f87171'}
              onPress={() => setShowChangePassword(!showChangePassword)}
            />
          </View>
          {showChangePassword && (
            <>
              <FormInput
                value={password}
                style={{ borderColor: '#f87171' }}
                setValue={setPassword}
                placeholder="Old Password"
                secureTextEntry
                prefixIcon={<Icon name="lock" size={20} color="#f87171" />}
                className="mt-2 bg-white rounded-lg"
              />
              <FormInput
                value={newPassword}
                style={{ borderColor: '#f87171' }}
                setValue={setNewPassword}
                placeholder="New Password"
                secureTextEntry
                prefixIcon={<Icon name="lock" size={20} color="#f87171" />}
                className=" bg-white rounded-lg"
              />
              <FormInput
                value={confirmPassword}
                style={{ borderColor: '#f87171' }}
                setValue={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
                prefixIcon={<Icon name="lock" size={20} color="#f87171" />}
                className=" bg-white rounded-lg"
              />
              <CustomButton
                title="Change Password"
                handlePress={() => { }}
                isLoading={isSubmitting}
                containerStyle="py-5"
              />
            </>
          )}
        </View>
      </View>
    </CustomWrapper>
  );
};

export default SettingTab;
