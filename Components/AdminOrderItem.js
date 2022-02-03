import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AdminOrderItem = () => {
    return (
        <View style={styles.container}>
            <View style={styles.orderBy}>
                <View>
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>Order by</Text>
                    <Text>udaydheeraj</Text>
                </View>
                <Text style={styles.itemsCount}>2 items</Text>
            </View>
            <View style={styles.dateView}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>Date</Text>
                <Text>tuesday jan 11</Text>
            </View>
            <View style={styles.dateView}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>Status</Text>
                <Text style={{ color: "#008000" }}>placed</Text>
            </View>
            <View style={styles.btnsView}>
                <Button
                    icon={<Icon name="check-all" size={24} style={styles.iconStyle} />}
                    iconPosition="right"
                    title="Delivered"
                    buttonStyle={styles.btnStyle}
                    
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
                    
                />
            </View>
        </View>
    )
}
export default AdminOrderItem;

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
        backgroundColor: "#EF7215",
    },
    iconStyle: {
        marginLeft: 12,
        color: "#FFFFFF",
    },
});
