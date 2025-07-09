import { Image, Text, View } from "react-native";

type TabBarItemProps = {
    source: any; // Adjust type according to your image sources
    focused: boolean;
    cart?: boolean;
    name?: string;
};
export const TabBarItem = ({ source, focused, cart, name, }: TabBarItemProps) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: cart ? -10 : 18, }}>
            {cart && (
                <View
                    style={{
                        position: 'absolute',
                        top: -8,
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        backgroundColor: '#000',
                        opacity: 0.05,
                        zIndex: -2,
                    }}
                />
            )}

            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: cart ? 64 : 'auto',
                height: cart ? 64 : 'auto',
                borderRadius: cart ? 32 : 0,
                backgroundColor: focused ? (cart ? '#2b6cb0' : 'white') : 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                // Android
                elevation: cart ? 2 : 0,
            }}>

                <Image source={source}
                    style={{
                        tintColor: focused ? (cart ? 'white' : '#2b6cb0') : 'black',
                        width: 28,
                        height: 28,
                    }}
                />
            </View>
            {!cart && (
                <Text
                    className="font-pthin text-base"
                    style={{ color: focused ? '#2b6cb0' : 'black', fontSize: 12 }}>
                    {name}
                </Text>
            )}
        </View>
    );
};