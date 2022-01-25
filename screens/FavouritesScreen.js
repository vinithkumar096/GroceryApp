import { StyleSheet, Text, View, ScrollView } from "react-native";
import FavoriteItem from "../components/FavoriteItem";


  const { favourites } = useAppState();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 8 }}>
          Favourite Items
        </Text>
        <View>
          {favourites.length < 1 && <Text style={{textAlign: "center", marginTop: 64, color: "gray"}}>No favourites</Text>}
          {favourites.map((product, index) => (
            <FavoriteItem key={`${index}-${product.id}`} {...product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    padding: 20,
  },
});
