import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../constants/colors";
import { useAuth } from "../context/AuthProvider";
import { getMyOrders } from "../helpers/methods";


export default function OrderScreen({ route, navigation }) {
  const [showMessage, setShowMessage] = useState(route?.params?.message || false);
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getMyOrders(user.email, (orders) => setMyOrders(orders), console.log)
  }, [])

  const goBack = () => {
    navigation.goBack();
  };

  function getOrderTotal(order){
    let cartTotal = 0.0;
    order.products.forEach(item => {
      cartTotal = (parseFloat(cartTotal) + parseFloat(item.total)).toPrecision(3)
    })
    return cartTotal;
  }

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
          Orders Page
        </Text>
      </View>

      {showMessage && 
      <View style={styles.confirmationView}>
        <Text style={{ width: 290 }}>
          A confirmation email has been sent to your inbox, please confirm your
          order.
        </Text>
        <Icon name="times" color="rgba(0, 0, 0, 0.6)" size={20} onPress={() => setShowMessage(false)} />
      </View>
      }

      {myOrders.length > 0 &&
      <View style={styles.orderProgress}>
        <Text style={{marginBottom: 8, color: "black"}}>Order id: <Text style={{fontWeight: "bold"}}>{myOrders[0].id}</Text></Text>
        <Text
          style={{
            color: "rgba(0, 0, 0, 0.65)",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Your order is { myOrders[0].status === "placed" ? "on the way": "delivered"}
        </Text>
        {/* <Text>Arrives today, 4pm - 5pm</Text> */}

        <View style={styles.progress}>
          <View style={{backgroundColor: colors.primary, width: myOrders[0].status === "placed" ? "50%":"100%", height: "100%"}}></View>
        </View>

        <View style={styles.progressText}>
          <Text>Placed</Text>
          <Text>Preparing</Text>
          <Text>On-the-way</Text>
          <Text>Delivered</Text>
        </View>
      </View>
      }

      <Text style={{fontWeight: "bold", fontSize: 18, marginTop: 32, marginBottom: 12}}>My Orders</Text>
      {myOrders.length < 1 && (<Text style={{textAlign: "center", color: "gray", marginTop: 32}}>No orders</Text>)}
      {myOrders.map(order => (
        <View key={order.id} style={{borderRadius: 8, borderWidth: 1, borderColor: "#000", padding: 12, marginBottom: 8}}>
          <View style={{flexDirection: "row", alignItems: "baseline", justifyContent: "space-between"}}>
            <Text style={{fontSize: 14, color: "gray"}}>{order.products.length} {order.products.length > 1 ? "items": "item"}</Text>
            <Text style={{fontWeight: "bold", color: colors.primary}}>Total: ${getOrderTotal(order)}</Text>
          </View>
          <Text style={{marginBottom: 8}}>Order id: <Text style={{fontWeight: "bold"}}>{order.id}</Text></Text>
          {order.products.map(item => (
            <View key={item.id} style={{flexDirection: "row"}}>
              <Text style={{fontWeight: "bold", marginRight: 8}}>{item.title}</Text>
              <Text style={{fontWeight: "bold", color: colors.primary, marginRight: 20}}>${item.price} x {item.amount} =</Text>
              <Text style={{fontWeight: "bold", color: colors.primary}}>Total: ${item.total}</Text>
            </View>
          ))}
          <Text>{order.time}</Text>
          <Text style={{color: colors.navItemActive, fontWeight: "bold"}}>{order.status}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
  },
  btnGoBack: {
    width: 30,
    height: 30,
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 8,
  },
  confirmationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#70C6F6",
  },
  orderProgress: {
    padding: 4,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#04A2FB",
    borderRadius: 8,
  },
  progress: {
    height: 8,
    marginTop: 20,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#04A2FB",
  },
  progressText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
  },
});
