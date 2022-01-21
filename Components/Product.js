import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

import colors from "../constants/colors";
import images from "../constants/images";
import { useAppState } from "../context/AppStateProvider";

export default function Product({ id, image, title, description, category, price, rating=null }) {
  const { favourites, isProductInFavourites, addToFavourites, removeFromFavourites } = useAppState();
  const [favourite, setFavourite] = useState(() => isProductInFavourites(id));
  const navigation = useNavigation();

  useEffect(() => {
    setFavourite(isProductInFavourites(id))
  }, [favourites])

  function toggleFavorite() {
    setFavourite(prev => !prev)
    if (favourite) removeFromFavourites(id)
    else addToFavourites({ id, image, title, description, category, price, rating })
  }
  function goToProductDetail(){
    navigation.navigate("ProductDetailScreen", { id, image, title, description, category, price, rating });
  }
  function parseImageUrl(){
    if (images[image]) return images[image]
    else {
      return { uri: image }
    }
  }
  return (
    <View style={styles.productView}>
      <Pressable onPress={goToProductDetail}>
        <Image
          source={parseImageUrl()}
          style={{ height: 100, width: "100%", backgroundColor: "#c4c4c4" }}
          resizeMode="cover"
        />
        <View style={{ padding: 10 }}>
          <Text>{title}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>${price}</Text>
            <Button
              buttonStyle={styles.btnAddtoCart}
              icon={<Icon name={favourite ? "heart":"heart-outline"} color={colors.primary} size={24} />}
              onPress={toggleFavorite}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  productView: {
    width: 154,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 10,
    marginBottom: 10,
  },
  btnAddtoCart: {
    backgroundColor: "transparent",
    color: colors.white,
    borderRadius: 8,
    padding: 0,
  },
});
