import { StyleSheet, Text, View, ScrollView } from "react-native";
import Product from "./Product";

export default function ProductCategory({ title, data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal>
        <View style={styles.row}>
          {data?.map((product, index) => (
            <Product key={`${product.id}-${index}`} {...product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#000",
    marginBottom: 16,
  },
  title: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
});
