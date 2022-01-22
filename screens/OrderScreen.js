import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import Icon from "react-native-vector-icons/FontAwesome5";

const OrderScreen = ({navigation}) => {
    const goBack = () => {
        navigation.navigate("AccountScreen");
      };
      
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Button
                    buttonStyle={styles.btnGoBack}
                    icon={
                        <Icon
                            name="chevron-left"
                            color={"#FFFFFF"}
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
            <View style={styles.orderProgress}>
                <Text style={{ marginBottom: 8, color: "black" }}>Order id: <Text style={{ fontWeight: "bold" }}>order id</Text></Text>
                <Text
                    style={{
                        color: "rgba(0, 0, 0, 0.65)",
                        fontSize: 16,
                        fontWeight: "bold",
                    }}
                >
                    Your order is on the way
                </Text>
                {/* <Text>Arrives today, 4pm - 5pm</Text> */}

                <View style={styles.progress}>
                    <View style={{ backgroundColor: "#EF7215", width: "50%", height: "100%" }}></View>
                </View>

                <View style={styles.progressText}>
                    <Text>Placed</Text>
                    <Text>Preparing</Text>
                    <Text>On-the-way</Text>
                    <Text>Delivered</Text>
                </View>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 32, marginBottom: 12 }}>My Orders</Text>
            <Text style={{ textAlign: "center", color: "gray", marginTop: 32 }}>No orders</Text>
            <View style={{ borderRadius: 8, borderWidth: 1, borderColor: "#000", padding: 12, marginBottom: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 14, color: "gray" }}> 1 item </Text>
                    <Text style={{ fontWeight: "bold", color: "#EF7215"}}>Total: $--.00</Text>
                </View>
                <Text style={{ marginBottom: 8 }}>Order id: <Text style={{ fontWeight: "bold" }}>order id</Text></Text>
               
                    <View  style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", marginRight: 8 }}>item name</Text>
                        <Text style={{ fontWeight: "bold", color: "#EF7215", marginRight: 20 }}>$ 2(item price) x 3 (item amount) =</Text>
                        <Text style={{ fontWeight: "bold", color: "#EF7215" }}>Total: $6 (item total)</Text>
                    </View>
                
                <Text>Monday jan 03 2022 .....(order time)</Text>
                <Text style={{ color: colors.navItemActive, fontWeight: "bold" }}>order status(placed..delivered..)</Text>
            </View>

        </View>
        </ScrollView>
    )
}

export default OrderScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        position: "relative",
        top: 100,
        left: 0,
    },
    btnGoBack: {
        width: 30,
        height: 30,
        backgroundColor: "#EF7215",
        color: "#FFFFFF",
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
