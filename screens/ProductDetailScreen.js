import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, ScrollView } from "react-native";
import { Button, Rating } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";
import { useAppState } from "../context/AppStateProvider";
import { useAuth } from "../context/AuthProvider";
import { deleteProduct, getProduct } from "../helpers/methods";
import images from "../constants/images";

export default function ProductDetailScreen({ navigation, route }) {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(route.params || null)
  const [rating, setRating] = useState(product?.rating);
  const { user } = useAuth();
  const { cart, addToCart, isProductInCart, removeFromCart, favourites, isProductInFavourites, addToFavourites, removeFromFavourites } = useAppState();
  const [favourite, setFavourite] = useState(() => isProductInFavourites(product.id));
  const [inCart, setInCart] = useState(() => isProductInCart(product.id));

  useEffect(() => {
    if (!product?.title){
      getProduct(product?.id, (data) => setProduct(data), console.log)
    }
  }, [route])

  useEffect(() => {
    setInCart(isProductInCart(product.id))
  }, [cart])
  
  useEffect(() => {
    setFavourite(isProductInFavourites(product.id))
  }, [favourites])

  const goBack = () => {
    navigation.navigate("HomeScreen", { refresh: true });
  };
  const goToCart = () => {
    navigation.navigate("Cart");
  };
  const addProductToCart = () => {
    addToCart(product, count)
    alert("Added to cart")
  }
  const removeProductFromCart = () => {
    removeFromCart(product.id)
    alert("Removed from cart")
  }
  const goToUpdateProduct = () => {
    navigation.replace("UpdateProductScreen", product);
  };

  function toggleFavorites() {
    if (isProductInFavourites(product.id)){
      removeFromFavourites(product.id)
    } else {
      addToFavourites(product)
    }
  }

  function deleteProduct_(){
    deleteProduct(product.id, () => {
      removeFromFavourites(product.id)
      removeFromCart(product.id)
      alert("Product deleted successfully")
      navigation.replace("HomeScreen", { refresh: true })
    }, () => alert("Failed to delete"))
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={images[product?.image] || { uri: product.image }}
        style={styles.top}
      >
        <Button
          buttonStyle={styles.btnBackCart}
          icon={<Icon name="chevron-left" color={colors.white} size={24} />}
          onPress={goBack}
        />
        <Button
          buttonStyle={[styles.btnBackCart, { right: 20 }]}
          icon={<Icon name="cart-outline" color={colors.white} size={24} />}
          onPress={goToCart}
        />
      </ImageBackground>

      <ScrollView style={{ padding: 20, marginBottom: 100, flex: 1 }}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{product?.title}</Text>
            <Text style={{fontWeight: "bold", marginLeft: 32}}>({product?.rating})</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Rating showRating={false} fractions={1} startingValue={rating} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                buttonStyle={styles.btnBackCart}
                icon={<Icon name="minus" color={colors.white} size={24} />}
                onPress={() => setCount(prev => { 
                  if (prev > 0) return prev - 1
                  else return prev
                })}
              />
              <Text style={{ marginRight: 10, marginLeft: 10 }}>{count}</Text>
              <Button
                buttonStyle={styles.btnBackCart}
                icon={<Icon name="plus" color={colors.white} size={24} />}
                onPress={() => setCount(prev => {
                  if (prev < 10) return prev + 1
                  else return prev
                })}
              />
            </View>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 24,
              marginTop: 16,
            }}
          >
            ${product?.price}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Description</Text>
          <Text>{product?.description}</Text>
          <Button
            icon={<Icon name={favourite ? "heart":"heart-outline"} color={colors.primary} size={24} />}
            buttonStyle={styles.btnAddtoFavorites}
            title="Add to favourites"
            titleStyle={{color: "black"}}
            type="clear"
            onPress={toggleFavorites}
          />
          {user?.isAdmin && 
          <>
            <Button
              buttonStyle={{ marginTop: 20, marginBottom: 20 }}
              title="Update product"
              onPress={goToUpdateProduct}
            />
            <Button
              buttonStyle={{ marginBottom: 40, backgroundColor: "red" }}
              title="Delete product"
              onPress={deleteProduct_}
            />
          </>
          }
      </ScrollView>
      
      <View style={styles.addToCartView}>
        <View>
          <Text style={{ color: colors.white }}>Total</Text>
          <Text
            style={{
              color: colors.white,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            ${parseFloat(product?.price * count).toPrecision(3)}
          </Text>
        </View>
        {inCart ?
        <Button
          buttonStyle={[styles.btnAddToCart, {backgroundColor: "red"}]}
          title="Remove from cart"
          type="solid"
          onPress={removeProductFromCart}
        />:
        <Button
          buttonStyle={styles.btnAddToCart}
          title="Add to cart"
          titleStyle={{color: colors.primary}}
          type="clear"
          onPress={addProductToCart}
        />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  top: {
    height: 260,
    position: "relative",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnBackCart: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 8,
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  backCartIcon: {
    width: 24,
    height: 24,
  },
  btnAddToCart: {
    backgroundColor: colors.white,
    borderRadius: 8,
    color: colors.primary,
    fontWeight: "bold",
    paddingHorizontal: 24,
  },
  addToCartView: {
    height: 100,
    padding: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
  },
  btnAddtoFavorites: {
    width: 164,
    backgroundColor: "transparent",
    color: "#000",
    marginTop: 24,
  },
});
