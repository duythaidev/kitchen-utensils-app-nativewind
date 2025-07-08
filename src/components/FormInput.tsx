import { View, TextInput } from "react-native"


export const FormInput = (
    { prefixIcon, suffixIcon, placeholder, value, setValue, secureTextEntry = false }
      :
      {
        prefixIcon?: React.ReactNode,
        suffixIcon?: React.ReactNode,
        placeholder?: string,
        value: string,
        setValue: (value: string) => void,
        secureTextEntry?: boolean
      }
  ) => {
    return (
      <View className='flex-row items-center justify-between  border border-gray-300 rounded-lg p-4 py-3 mb-4'>
        <View className='flex-row items-center justify-center gap-2'>
          {prefixIcon}
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={prev => setValue(prev)}
            className="text-xl"
            secureTextEntry={secureTextEntry}
          />
        </View>
        {suffixIcon}
      </View>
  
    )
  }