import { View, FlatList } from "react-native";
import ProductItem from "./ProductItem";
import { IProduct } from "../types";

const ProductList = ({ products }: { products: IProduct[] }) => {
    return (
        <View className="my-8">
        <FlatList
          data={products}
          renderItem={({ item }) => {
            const mainImage = item.images?.find(img => img.is_main)?.image_url || '';
            return (
              <ProductItem
                image={mainImage}
                title={item.product_name}
                description={item.description || ''}
                price={item.discounted_price || item.price}
                priceBeforeDeal={item.price}
                priceOff={
                  item.discounted_price
                    ? Math.round(((item.price - item.discounted_price) / item.price) * 100)
                    : 0
                }
                stars={4.5}
                numberOfReview={5}
                itemDetails={item}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-8" />}
          ListFooterComponent={<View className="w-8" />}
          ListHeaderComponent={<View className="w-8" />}
        />
      </View>
    );
}

export default ProductList;