import Icon from "@react-native-vector-icons/lucide";
import { Text, View } from "react-native";

const Stars = ({ stars = 0, numberOfReview = 0 }: { stars: number, numberOfReview: number }) => {
    return (
        <View className="flex flex-row items-center my-2">
            {/* Nền: 5 sao xám */}
            <View className="relative flex flex-row">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Icon key={index} name="star" size={18} color="gray" />
                ))}

                {/* Sao vàng chồng lên, width = stars / 5 */}
                <View style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    width: `${(stars / 5) * 100}%`, // phần trăm width theo số sao
                }}
                    pointerEvents="none" // không ảnh hưởng đến thao tác chạm
                >
                    {Array.from({ length: Math.ceil(stars) }).map((_, index) =>
                        index === Math.ceil(stars)
                            ?
                            stars % 1 !== 0 && <Icon key={index} name="star-half" size={18} color="gold" />
                            :
                            <Icon key={index} name="star" size={18} color="gold" />
                    )
                    }
                </View>
            </View>


            <Text className="text-base font-light ml-2 text-black-100/90">
                ({numberOfReview})
            </Text>
        </View>
    );
}

export default Stars;