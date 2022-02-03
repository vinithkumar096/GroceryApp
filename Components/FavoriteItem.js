import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAppState } from "../context/AppStateProvider";
import { useNavigation } from "@react-navigation/native";
import images from "../constants/images";

export default function FavoriteItem(props) {
  const { removeFromFavourites } = useAppState();
  const navigation = useNavigation();

  function goToProductDetail(){
    navigation.navigate("ProductDetailScreen", props);
  }
  return (
    <View style={styles.favoriteItemView}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable onPress={goToProductDetail}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={images[props.image] || { uri: props.image }}
              style={{ width: 120, height: 118, borderWidth: 0, borderRadius: 8 }}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 12 }}>
              {props.title}
            </Text>
          </View>
        </Pressable>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginRight: 10,
            padding: 4,
          }}
        >
          <Icon
            name="times"
            style={{ color: colors.primary, fontWeight: "bold", fontSize: 20 }}
            onPress={() => removeFromFavourites(props.id)}
          />
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>${props.price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteItemView: {
    height: 120,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
  },
});
