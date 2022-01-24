import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
//import { Button } from "react-native-elements";

const AccountScreen = ({navigation}) => {
    function goToViewOrders() {
    navigation.navigate("ViewOrdersScreen");
  }
  function goToMyOrders() {
    navigation.navigate("OrderScreen");
  }
  function goToAddProduct() {
    navigation.navigate("AddProductScreen");
  }
    return (
        <View style={styles.container} >
            <ScrollView>
                <View style={[styles.textIconstyles, { marginBottom: 16 }]}>
                    <Icon name="person" size={24} style={{ marginRight: 12 }} />
                    <Text iconStyle={styles.textStyle}>Admin User</Text>
                </View>
                <View style={styles.textIconstyles}>
                    <Icon name="email" size={24} style={{ marginRight: 12 }} />
                    <Text iconStyle={styles.textStyle}>adminuser@gmail.com</Text>
                </View>
                <View style={styles.adminBtnsView}>
            <Button
              buttonStyle={[styles.btnsTyle, {alignSelf: "center"}]}
              title="Add product"
              icon={<Icon name="add" size={24} style={styles.iconStyle} />}
              iconPosition="right"
              onPress={goToAddProduct}
            />
            <Button
              buttonStyle={[styles.btnsTyle, {alignSelf: "center"}]}
              title="Orders(admin)"
              icon={
                <Icon
                  name="format-list-bulleted"
                  size={20}
                  style={styles.iconStyle}
                />
              }
              iconPosition="right"
            
            />
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
          
        />
        <Button
          icon={
            <Icon
              name="logout"
              size={20}
              style={{ color:'white', marginLeft: 55 }}
            />
          }
          iconPosition="right"
          title="Logout"
          buttonStyle={styles.btnSignOut}
          
        />
          </View>
            </ScrollView>
        </View>
    )
}

export default AccountScreen;

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
      btnsTyle: {
        width: 180,
        height: 46,
        borderRadius: 8,
        marginTop: 20,
        // backgroundColor: colors.primary,
        backgroundColor:"#EF7215",
        
        
      },
      iconStyle: { marginLeft: 20, 
        color:"white",
        
        // color: colors.white
        
     },
     btnSignOut: {
      width: 180,
      borderRadius: 8,
      backgroundColor: "#F04444",
      color: 'white',
      marginTop: 64,
      alignSelf: "center",
    },
});
