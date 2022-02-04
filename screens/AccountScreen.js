import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../constants/colors";
import { useAuth } from "../context/AuthProvider";

export default function AccountScreen({ navigation }) {
  const { user, refresh, loading, logout } = useAuth();

  function goToAddProduct() {
    navigation.navigate("AddProductScreen");
  }
  function goToViewOrders() {
    navigation.navigate("ViewOrdersScreen");
  }
  function goToMyOrders() {
    navigation.navigate("OrdersScreen");
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
      >
        <View style={[styles.textIconstyles, {marginBottom: 16}]}>
          <Icon name="person" size={24} style={{ marginRight: 12 }} />
          <Text iconStyle={styles.textStyle}>{user?.name}</Text>
        </View>
        <View style={styles.textIconstyles}>
          <Icon name="email" size={24} style={{ marginRight: 12 }} />
          <Text iconStyle={styles.textStyle}>{user?.email}</Text>
        </View>

        {user.isAdmin && (
          <View style={styles.adminBtnsView}>
            <Button
              buttonStyle={styles.btnsTyle}
              title="Add product"
              icon={<Icon name="add" size={24} style={styles.iconStyle} />}
              iconPosition="right"
              onPress={goToAddProduct}
            />
            <Button
              buttonStyle={styles.btnsTyle}
              title="Orders(admin)"
              icon={
                <Icon
                  name="format-list-bulleted"
                  size={20}
                  style={styles.iconStyle}
                />
              }
              iconPosition="right"
              onPress={goToViewOrders}
            />
          </View>
        )}
        <Button
          buttonStyle={[styles.btnsTyle, {alignSelf: "center"}]}
          title="My orders"
          icon={
            <Icon
              name="format-list-bulleted"
              size={20}
              style={styles.iconStyle}
            />
          }
          iconPosition="right"
          onPress={goToMyOrders}
        />
        <Button
          icon={
            <Icon
              name="logout"
              size={20}
              style={{ color: colors.white, marginLeft: 55 }}
            />
          }
          iconPosition="right"
          title="Logout"
          buttonStyle={styles.btnSignOut}
          onPress={() => logout()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  textIconstyles: {
    width: 320,
    marginTop: 20,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btnSignOut: {
    width: 180,
    borderRadius: 8,
    backgroundColor: "#F04444",
    color: colors.white,
    marginTop: 64,
    alignSelf: "center",
  },
  adminBtnsView: {
    alignItems: "center",
  },
  btnsTyle: {
    width: 180,
    height: 46,
    borderRadius: 8,
    marginTop: 20,
    backgroundColor: colors.primary,
  },
  iconStyle: { marginLeft: 20, color: colors.white },
});
