import { useState } from "react";
import { KeyboardAvoidingView, Text, ScrollView, StyleSheet, View, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker";

import { addProduct } from "../helpers/methods";
import colors from "../constants/colors";


export default function AddProductScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState();

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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const addNewProduct = () => {
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
      image,
      rating: 0.0
    }
    addProduct(data, () => {
      navigation.goBack();
      navigation.navigate("HomeScreen", { refresh: true });
      alert("Product added successfully")
    }, console.log);
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
            Admin: Add Product
          </Text>
        </View>
        <KeyboardAvoidingView style={styles.inputViewStyle} behaviour="padding">
          <Text style={styles.inputlabelStyle}>Title</Text>
          <Input
            placeholder="Enter title..."
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={(text) => setTitle(text.trim())}
          />
          <Text style={styles.inputlabelStyle}>Price</Text>
          <Input
            placeholder="Enter price..."
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={(text) => setPrice(text)}
          />
          <Text style={styles.inputlabelStyle}>Description</Text>
          <Input
            placeholder="Enter description..."
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={(text) => setDescription(text)}
          />
          <Text style={styles.inputlabelStyle}>Category</Text>
          <Picker
            selectedValue={category}
            onValueChange={(value, index) => setCategory(value)}
          >
            <Picker.Item label="----------" value="" />
            <Picker.Item label="Fruits" value="fruits" />
            <Picker.Item label="Vegetables" value="vegetables" />
          </Picker>
          <Text style={styles.inputlabelStyle}>Image</Text>
          <Button
            title="Select image"
            onPress={pickImage}
            buttonStyle={{marginBottom: 32, marginLeft: 10, marginRight: 10}}
          />
          {image && <Image source={{ uri: image }} style={{ width: "100%", maxWidth: 400, height: 300, marginHorizontal: 10, marginBottom: 32 }} />}
          <Button
            title="Submit"
            onPress={addNewProduct}
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
