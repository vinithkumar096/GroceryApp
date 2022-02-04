import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../constants/colors";
import AdminOrderItem from "../components/AdminOrderItem";
import { useEffect, useState } from "react";
import { getAllOrders } from "../helpers/methods";

export default function ViewOrdersScreen({ navigation }) {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    getAllOrders((orders) => setAllOrders(orders), console.log)
  }, [])

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Button
          buttonStyle={styles.btnGoBack}
          icon={
            <Icon
              name="chevron-left"
              color={colors.white}
              size={14}
              style={{ textAlign: "center" }}
            />
          }
          onPress={goBack}
        />
        <Text style={{ fontWeight: "bold", fontSize: 22, marginLeft: 32 }}>
          Admin Orders Page
        </Text>
      </View>
      <ScrollView>
        {allOrders.length < 1 && (<Text style={{textAlign: "center", color: "gray", marginTop: 32}}>No orders</Text>)}
        {allOrders.map(order => (
          <AdminOrderItem key={order.id} {...order} refresh={() => getAllOrders((orders) => setAllOrders(orders), console.log)} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  btnGoBack: {
    width: 30,
    height: 30,
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 8,
  },
});
