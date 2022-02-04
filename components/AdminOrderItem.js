import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";
import { updateOrder } from "../helpers/methods";

export default function AdminOrderItem(order) {
  function markOrderAsDelivered(){
    updateOrder(order.id, { status: "delivered" }, () => order?.refresh?.())
    alert("Order marked as Delivered")
  }
  
  function markOrderAsPickUp(){
    updateOrder(order.id, { status: "pick-up" }, () => order?.refresh?.())
    alert("Order marked as Pick-up")
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.orderBy}>
        <View>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>Order by</Text>
          <Text>{order.user}</Text>
        </View>
        <Text style={styles.itemsCount}>{order.products.length} {order.products.length > 1 ? "items": "item"}</Text>
      </View>
      <View style={styles.dateView}>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Date</Text>
        <Text>{order?.time?.toString()}</Text>
      </View>
      <View style={styles.dateView}>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Status</Text>
        <Text style={{color: colors.navItemActive}}>{order?.status}</Text>
      </View>
      <View style={styles.btnsView}>
        <Button
          icon={<Icon name="check-all" size={24} style={styles.iconStyle} />}
          iconPosition="right"
          title="Delivered"
          buttonStyle={styles.btnStyle}
          onPress={markOrderAsDelivered}
        />
        <Button
          icon={
            <Icon
              name="account-check-outline"
              size={24}
              style={[styles.iconStyle, { color: "#000" }]}
            />
          }
          iconPosition="right"
          title="Pick up"
          titleStyle={{ color: "#000" }}
          buttonStyle={[styles.btnStyle, { backgroundColor: "#DED7CD" }]}
          onPress={markOrderAsPickUp}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#000",
  },
  orderBy: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  itemsCount: {
    fontSize: 12,
    fontWeight: "bold",
  },
  dateView: {
    marginTop: 12,
  },
  btnsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  btnStyle: {
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  iconStyle: {
    marginLeft: 12,
    color: colors.white,
  },
});
