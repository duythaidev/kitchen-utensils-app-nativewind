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
    <View className='flex-row items-center justify-between gap-x-2 border border-gray-300 rounded-lg p-4 py-3 mb-4'>
      {prefixIcon}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={prev => setValue(prev)}
        className="text-[#575757] flex-1 text-xl"
        secureTextEntry={secureTextEntry}
      />
      {suffixIcon}
    </View>

  )
}