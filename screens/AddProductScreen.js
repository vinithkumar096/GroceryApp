import React from "react";
import { KeyboardAvoidingView, Text, ScrollView, StyleSheet, View, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";

const AddProductScreen = ({navigation}) => {
    const goBack = () => {
        navigation.navigate("AccountScreen");
      }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                    <Button
                        buttonStyle={styles.btnBackCart}
                        icon={<Icon name="chevron-left" color={"#FFFFFF"} size={24} />}
                    onPress={goBack}
                    />
                    <Text style={{ marginLeft: 30, fontWeight: "bold", fontSize: 18 }}>
                        Admin: Add Product
                    </Text>
                </View>
                <KeyboardAvoidingView style={styles.inputViewStyle} behaviour="padding">
                    <Text style={styles.inputlabelStyle}>Title</Text>
                    <Input
                        placeholder="Enter title..."
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        // onChangeText={(text) => setTitle(text.trim())}
                    />
                    <Text style={styles.inputlabelStyle}>Price</Text>
                    <Input
                        placeholder="Enter price..."
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        // onChangeText={(text) => setPrice(text)}
                    />
                    <Text style={styles.inputlabelStyle}>Description</Text>
                    <Input
                        placeholder="Enter description..."
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        // onChangeText={(text) => setDescription(text)}
                    />
                    <Text style={styles.inputlabelStyle}>Category</Text>
                    <Picker
                        // selectedValue={category}
                        // onValueChange={(value, index) => setCategory(value)}
                    >
                        <Picker.Item label="----------" value="" />
                        <Picker.Item label="Fruits" value="fruits" />
                        <Picker.Item label="Vegetables" value="vegetables" />
                    </Picker>
                    <Text style={styles.inputlabelStyle}>Image</Text>
                    <Button
                        title="Select image"
                        // onPress={pickImage}
                        buttonStyle={{ marginBottom: 32, marginLeft: 10, marginRight: 10 }}
                    />
                    
                    <Button
                        title="Submit"
                        // onPress={addNewProduct}
                        buttonStyle={styles.loginBtnStyle}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

        </View>
    )

}

export default AddProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: "relative",
        padding: 20,
    },
    btnBackCart: {
        backgroundColor: "#EF7215",
        color: "#FFFFFF",
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    inputViewStyle: {
        marginTop: 22,
        // marginLeft: 10,
    },
    inputContainerStyle: {
        borderColor: "transparent",
        margin: 0,
    },
    inputStyle: {
        height: 46,
        borderWidth: 1,
        borderColor: "#EF7215",
        borderRadius: 8,
        padding: 6,
        width: "100%",
        // height: 52,
    },
    inputlabelStyle: {
        marginLeft: 10,
    },
    loginBtnStyle: {
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        backgroundColor: "#EF7215",
    },
});
