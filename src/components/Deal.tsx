import Icon from "@react-native-vector-icons/lucide";
import { TouchableOpacity, View, Text, Image } from "react-native";

const Deal = ({ title, time, onPress }: { title: string, time: string, onPress?: () => void }) => {
    return (
        <TouchableOpacity
        // onPress={() => { navigation.navigate('Deal') }}
        >
  
          <View className="bg-red-400 rounded-xl justify-between items-center flex flex-row mx-5 mt-5 pl-5 py-5">
            <View>
              <Text className="text-white text-2xl font-semibold">Deal of the Day</Text>
              <View className="flex flex-row mt-3 items-center gap-x-1">
                <Icon name="calendar" size={20} color="white" />
                <Text className="text-white text-base font-medium">22h 55m 20s remaining</Text>
              </View>
            </View>
            <View className="rounded-lg border-white border-2 mr-3 h-12 px-3 flex flex-row gap-x-px items-center">
              <Text className="text-white font-medium text-lg" >View all</Text>
              <Icon name="arrow-right" size={20} color="white" />
            </View>
          </View>
        </TouchableOpacity>
    );
}

export default Deal;