import { useRef } from "react";
import { Dimensions, View, TouchableOpacity, Image } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";

const CarouselBanner = () => {
    // banner
    const imgArray = [
        require('../assets/images/deal.png'),
        require('../assets/images/banner.jpg'),
        require('../assets/images/banner1.jpg'),
    ]

    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    const data = imgArray.map((item) => {
        return (
            <Image className='w-full h-full'
                resizeMode='cover'
                source={item}
            />
        )
    })

    const width = Dimensions.get("window").width;



    return (
        <View className='flex mt-5'>
            <Carousel
                autoPlay
                autoPlayInterval={3000}
                ref={ref}
                width={width}
                height={width / 2}
                data={data}
                onProgressChange={progress}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity>
                            {item}
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 50 }}
                containerStyle={{ gap: 5, marginTop: 10 }}
                onPress={onPressPagination}
            />
        </View>
    );
};

export default CarouselBanner;
