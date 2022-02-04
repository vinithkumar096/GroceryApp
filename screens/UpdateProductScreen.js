import { useState } from "react";
import { KeyboardAvoidingView, Text, ScrollView, StyleSheet, View, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";
import * as ImagePicker from 'expo-image-picker';
import { updateProduct } from "../helpers/methods";


export default function UpdateProductScreen({ navigation, route }) {
    const [title, setTitle] = useState(route?.params?.title || '');
    const [price, setPrice] = useState(route?.params?.price || '');
    const [description, setDescription] = useState(route?.params?.description || '');
    const [category, setCategory] = useState(route?.params?.category || '');
    const [image, setImage] = useState(route?.params?.image || null);
    const [changedData, setChangedData] = useState({});

    const handleChange = (key, value) => {
        setChangedData(prev => ({
            ...prev,
            [key]: value.trim()
        }))
    }
    
    const goBack = () => {
        navigation.goBack();
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            handleChange('image', result.uri);
        }
    };

    const handleProductUpdate = () => {
        if (!title) {
            alert("Title is required")
            return
        }
        if (!price) {
            alert("Price is required")
            return
        }
        if (!image) {
            alert("Image is required")
            return
        }
        if (!category) {
            alert("Category is required")
            return
        }
        const data = {
            title,
            price,
            description,
            category,
            image
        }
        updateProduct(route?.params?.id, changedData, () => {
            // goBack();
            navigation.replace("ProductDetailScreen", { id: route?.params?.id })
            alert("Product updated successfully")      
        }, console.log)
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <Button
                    buttonStyle={styles.btnBackCart}
                    icon={<Icon name="chevron-left" color={colors.white} size={24} />}
                    onPress={goBack}
                />
                <Text style={{ marginLeft: 30, fontWeight: "bold", fontSize: 18 }}>
                    Admin: Update Product
                </Text>
                </View>
                <KeyboardAvoidingView style={styles.inputViewStyle} behaviour="padding">
                    <Text style={styles.inputlabelStyle}>Title</Text>
                    <Input
                        placeholder="Enter title..."
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        defaultValue={title}
                        onChangeText={(text) => handleChange('title', text)}
                    />
                    <Text style={styles.inputlabelStyle}>Price</Text>
                    <Input
                        placeholder="Enter price..."
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        defaultValue={price}
                        onChangeText={(text) => handleChange('price', text)}
                    />
                    <Text style={styles.inputlabelStyle}>Description</Text>
                    <Input
                        placeholder="Enter description..."
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        defaultValue={description}
                        onChangeText={(text) => handleChange('description', text)}
                    />
                    <Text style={styles.inputlabelStyle}>Category</Text>
                    <Input
                        placeholder="Enter category..."
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        defaultValue={category}
                        onChangeText={(text) => handleChange('category', text.trim().toLowerCase())}
                    />
                    <Text style={styles.inputlabelStyle}>Image</Text>
                    <Button
                        title="Select image"
                        onPress={pickImage}
                        buttonStyle={{marginBottom: 32, marginLeft: 10, marginRight: 10}}
                    />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginHorizontal: 10, marginBottom: 32 }} />}
                    <Button
                        title="Update"
                        onPress={handleProductUpdate}
                        buttonStyle={styles.loginBtnStyle}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative",
    padding: 20,
  },
  btnBackCart: {
    backgroundColor: colors.primary,
    color: colors.white,
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
    borderColor: colors.primary,
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
    backgroundColor: colors.primary,
  },
});
