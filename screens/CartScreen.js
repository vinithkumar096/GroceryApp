import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import Cartitem from "../components/Cartitem";
import { Button } from "react-native-elements";
import { useAppState } from "../context/AppStateProvider";
import { addOrder } from "../helpers/methods";
import { useAuth } from "../context/AuthProvider";
import sendConfirmationEmail from "../emailkey";


export default function CartScreen({ navigation }) {
  const { cart, getCartTotal, clearCart } = useAppState();
  const { user } = useAuth();

  const goToOrders = () => {
    if (cart.length < 1) return
    addOrder(user?.email, cart, () => {
      sendConfirmationEmail(user.name, user.email);
      clearCart();
      navigation.navigate("OrderScreen", {message: true});
      alert("Order added successfully");
    }, console.log);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Cart Page</Text>
          {cart.length > 0 &&
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Total: ${getCartTotal()}
          </Text>
          }
        </View>
        <View>
          {cart.length < 1 && <Text style={{textAlign: "center", color: "gray", marginTop: 64}}>No items in the cart</Text>}
          {cart.map(item => (
            <Cartitem key={item.id} {...item} />
          ))}
        </View>
        {cart.length > 0 &&
        <Button
          title="Order Now"
          buttonStyle={styles.orderBtnStyle}
          onPress={goToOrders}
        />
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  orderBtnStyle: {
    height: 40,
    borderRadius: 8,
    marginTop: 20,
  },
});
