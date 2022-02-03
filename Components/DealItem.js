import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../constants/colors";
import images from "../constants/images";


export default function DealItem(props) {
  return (
    <View style={styles.dealItemView}>
      <Pressable onPress={props.goToProductDetail}>
        <Image
          source={images[props.image]}
          style={{ height: 90, width: "100%", backgroundColor: "#c4c4c4" }}
          resizeMode="cover"
        />
        <Text style={{ color: "#333333", marginTop: 12, marginLeft: 10 }}>
          {props.title}
        </Text>
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  textDecorationLine: "line-through",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              >
                ${props.was}
              </Text>
              <Text style={{ marginLeft: 5, fontWeight: "bold" }}>${props.price}</Text>
            </View>
            <Button
              buttonStyle={styles.btnAddtoCart}
              icon={<Icon name="plus" color={colors.white} size={24} />}
              onPress={props.goToProductDetail}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dealItemView: {
    width: 154,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 4,
    marginBottom: 12,
  },
  btnAddtoCart: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 8,
    padding: 0,
  },
});
