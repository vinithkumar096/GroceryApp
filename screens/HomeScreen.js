import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import ProductCategory from "../components/ProductCategory";
import colors from "../constants/colors";
import { getFruits, getVegetables } from "../helpers/methods";

export default function HomeScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [fruits, setFruits] = useState([])
  const [vegetables, setVegetables] = useState([])

  const getProducts = useCallback(() => {
    setRefreshing(true)
    getFruits((fruits_) => {
      setFruits(fruits_)
      setRefreshing(false)
    }, console.log);

    getVegetables((vegetables_) => {
      setVegetables(vegetables_)
      setRefreshing(false)
    }, console.log);
  }, [route])


  useEffect(() => {
    getProducts()
  }, [getProducts])

  function goToDeals() {
    navigation.navigate("WeeklyDealsScreen");
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getProducts}
          />
        }
      >
        <Pressable onPress={goToDeals}>
          <ImageBackground
            style={styles.weeklyDeals}
            resizeMode="cover"
            source={require("../data/images/strawberries.png")}
          >
            <Text style={styles.dealsTitle}>Weekly deals</Text>
          </ImageBackground>
        </Pressable>
        <ProductCategory title="Fruits" data={fruits} />
        <ProductCategory title="Vegetables" data={vegetables} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    padding: 20,
  },
  weeklyDeals: {
    height: 180,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.navItemActive,
    overflow: "hidden",
    marginBottom: 16,
  },
  dealsTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
