import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import AdminOrderItem from "./AdminOrderItem";

const ViewOrdersScreen = ({navigation}) => {
    const goBack = () => {
        navigation.navigate("AccountScreen");
      }
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
                    Admin Orders Page
                </Text>
            </View>
            <ScrollView>
            <Text style={{textAlign: "center", color: "gray", marginTop: 32}}>No orders</Text>
            <AdminOrderItem />
            </ScrollView>
        </View>
        </ScrollView>
    )
}
export default  ViewOrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop:40,
    },
    btnGoBack: {
        width: 30,
        height: 30,
        backgroundColor: "#EF7215",
        color: "#FFFFFF",
        borderRadius: 8,
    },
});
