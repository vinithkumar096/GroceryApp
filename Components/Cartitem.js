import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAppState } from "../context/AppStateProvider";
import images from "../constants/images";

export default function Cartitem(item) {
  const { removeFromCart } = useAppState();
  return (
    <View style={styles.cartItemView}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={images[item.image] || { uri: item.image }}
            style={{ width: 120, height: 118, borderWidth: 0, borderRadius: 8 }}
          />

          <View style={styles.nameQtyView}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 16 }}>{item.amount}</Text>
          </View>
        </View>

        <View style={styles.cancelPriceView}>
          <Icon
            name="times"
            style={{ color: colors.primary, fontWeight: "bold", fontSize: 20 }}
            onPress={() => removeFromCart(item.id)}
          />
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>${item.total}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItemView: {
    height: 120,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
  },
  nameQtyView: {
    justifyContent: "space-between",
    marginLeft: 12,
    paddingBottom: 12,
    paddingTop: 12,
  },
  cancelPriceView: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginRight: 10,
    paddingBottom: 12,
    paddingTop: 12,
  },
});
