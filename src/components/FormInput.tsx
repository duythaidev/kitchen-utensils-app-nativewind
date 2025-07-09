import { View, TextInput } from "react-native"


export const FormInput = (
  { prefixIcon, className, suffixIcon, placeholder, value, setValue, disabled = false, secureTextEntry = false }
    :
    {
      prefixIcon?: React.ReactNode,
      className?: string,
      suffixIcon?: React.ReactNode,
      placeholder?: string,
      value: string,
      setValue: (value: string) => void,
      disabled?: boolean,
      secureTextEntry?: boolean
    }
) => {
  return (
    <View className={`flex-row items-center justify-between gap-x-2 border border-gray-300 rounded-lg p-4 py-3 mb-4 ${className}`}>
      {prefixIcon}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={prev => setValue(prev)}
        className="text-[#575757] flex-1 text-xl"
        secureTextEntry={secureTextEntry}
        editable={!disabled}
      />
      {suffixIcon}
    </View>

  )
}