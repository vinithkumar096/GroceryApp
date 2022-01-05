import React from "react";
import { Text, StyleSheet, View,ImageBackground,Pressable} from "react-native";
import colors from "../constants/colors";
const HomeScreen = ({ navigation }) => {

  function goToDeals() {
    navigation.navigate("WeeklyDealsScreen");
  }
  return (
    <View style={styles.container}>
        <Pressable onPress={goToDeals}>
          <ImageBackground
            style={styles.weeklyDeals}
            resizeMode="cover"
            source={require("../assets/images/strawberries.png")}
          >
            <Text style={styles.dealsTitle}>Weekly deals</Text>
          </ImageBackground>
        </Pressable>
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


export default HomeScreen;
