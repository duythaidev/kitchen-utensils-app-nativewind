import { Image, View } from "react-native";

const TabBarIcon = ({ focused, icon, className }: { focused: boolean; icon: any, className: string }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={icon} className={className} style={{ tintColor: focused ? '#2b6cb0' : 'black' }} />
    </View>
);

export default TabBarIcon;