import { StyleSheet, View, Text,Button } from "react-native";
//import { Button } from "react-native-elements";
import DealItem from "../components/DealItem";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const weeklyDeals = [
  {id: 1, title: "Apples", price: 0.5, was: 0.6, image: require("../assets/images/apples.png")},
  {id: 2, title: "Strawberries", price: 4.09, was: 4.99, image: require("../assets/images/strawberries.png")},
  {id: 3, title: "Carrots", price: 2.00, was: 2.50, image: require("../assets/images/carrots.png")},
]

export default function WeeklyDealsScreen({ navigation }) {
  const [deals, setDeals] = useState(weeklyDeals);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", alignItems: "baseline"}}>
        <Button
            buttonStyle={styles.btnBackCart}
            icon={<Icon name="chevron-left" color={colors.white} size={24} />}
            onPress={() => navigation.goBack()}
        />
        <Text style={{fontWeight: "bold", fontSize: 18, marginLeft: 32}}>Weekly Deals</Text>
      </View>
      <View style={styles.products}>
        {deals.map(deal => (
          <DealItem key={deal.id} {...deal} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  btnBackCart: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  products: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
