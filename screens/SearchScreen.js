import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import McIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Product from "../components/Product";


export default function SearchScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [allResults, setAllResults] = useState([]);
    const [results, setResults] = useState([]);
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null)

    const handleSearch = () => {
        setLoading(true);
        let products;
        getAllProducts(data => {
            products = data;
            setAllResults(
                products.filter(product =>
                    product.title
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                )
            );
            setLoading(false);
        }, console.log);
    };

    useEffect(() => {
        getAllProducts((data) => {
            setAllResults(data)
        }, console.log)
    }, [])

    useEffect(() => {
        if (filter) {
            setResults(allResults.filter(result => result.category === filter))
        } else {
            setResults(allResults)
        }
    }, [filter, allResults])

    return (
        <View style={styles.searchView}>
            <Input
                returnKeyType="search"
                placeholder="Search groceries..."
                leftIcon={
                    <Icon name="search" size={24} onPress={handleSearch} />
                }
                inputContainerStyle={styles.inputStyle}
                onChangeText={text => setSearch(text)}
                onSubmitEditing={() => handleSearch()}
            />
            <Text style={styles.sfTitle}>Sort and filter</Text>
            <View style={styles.sfRow}>
                <Button
                    buttonStyle={filter ? styles.sfBtn: styles.sfBtnActive}
                    title="All"
                    titleStyle={{
                        color: filter ? "rgba(51, 51, 51, 0.75)" : "white",
                        fontSize: 14,
                    }}
                    type={filter ? "outline": "solid"}
                    onPress={() => setFilter(null)}
                />
                <Button
                    buttonStyle={filter === "fruits" ? styles.sfBtnActive:styles.sfBtn}
                    title="Fruits"
                    titleStyle={{
                        color: filter === "fruits" ? "white" : "rgba(51, 51, 51, 0.75)",
                        fontSize: 14,
                    }}
                    type="outline"
                    onPress={() => setFilter("fruits")}
                />
                <Button
                    buttonStyle={filter === "vegetables" ? styles.sfBtnActive:styles.sfBtn}
                    title="Vegetables"
                    titleStyle={{
                        color: filter === "vegetables" ? "white" : "rgba(51, 51, 51, 0.75)",
                        fontSize: 14,
                    }}
                    type="outline"
                    onPress={() => setFilter("vegetables")}
                />
            </View>
            <View style={styles.sfRow}>
                <Button
                    buttonStyle={sort === "price" ? styles.sfBtnActive : styles.sfBtn}
                    title="Price"
                    titleStyle={{
                        color: sort === "price" ? "white" : "rgba(51, 51, 51, 0.75)",
                        fontSize: 14,
                        marginRight: 8,
                    }}
                    type="outline"
                    icon={
                        <McIcon
                            name="sort-ascending"
                            size={20}
                            color={sort === "price" ? "white" : "rgba(51, 51, 51, 0.75)"}
                        />
                    }
                    iconPosition="right"
                    onPress={() => {
                        setSort(prev => {
                            if (prev === "price") {
                                setResults(prev => prev.sort((a, b) => a.id > b.id))
                                return null
                            } else {
                                setResults(prev => prev.sort((a, b) => a.price > b.price))
                                return "price"
                            }
                        })
                    }}
                />
                <Button
                    buttonStyle={sort === 'title' ? styles.sfBtnActive : styles.sfBtn}
                    title="Title"
                    titleStyle={{
                        color: sort === "title" ? "white" : "rgba(51, 51, 51, 0.75)",
                        fontSize: 14,
                        marginRight: 8,
                    }}
                    type="outline"
                    icon={
                        <McIcon
                            name="sort-ascending"
                            size={20}
                            color={sort === "title" ? "white" : "rgba(51, 51, 51, 0.75)"}
                        />
                    }
                    iconPosition="right"
                    onPress={() => {
                        setSort(prev => {
                            if (prev === "title") {
                                setResults(prev => prev.sort((a, b) => a.id > b.id))
                                return null
                            } else {
                                setResults(prev => prev.sort((a, b) => a.title > b.title))
                                return "title"
                            }
                        })
                    }}
                />
            </View>

            <ScrollView>
                {loading && (
                    <Text
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "gray",
                        }}
                    >
                        Loading...
                    </Text>
                )}
                {!loading && results.length < 1 && (
                    <Text
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "gray",
                            marginTop: 32,
                        }}
                    >
                        No results
                    </Text>
                )}
                <View style={styles.searchResultsView}>
                    {results.map((result, index) => (
                        <Product key={`${index}-${result.id}`} {...result} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    searchView: {
        flex: 1,
        padding: 10,
    },
    searchResultsView: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: 10,
        marginTop:10,
    },
    inputStyle: {
        height: 46,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        padding: 6,
        marginTop: 10,
    },
    sfTitle: {
        fontWeight: "600",
        fontSize: 14,
        marginHorizontal: 10,
    },
    sfRow: {
        flexDirection: "row",
        marginTop: 8,
        marginHorizontal: 10,
    },
    sfBtn: {
        color: "rgba(51, 51, 51, 0.75)",
        borderColor: "rgba(51, 51, 51, 0.75)",
        marginRight: 8,
        borderRadius: 200,
        paddingVertical: 6,
        paddingHorizontal: 12,
        overflow: "hidden",
    },
    sfBtnActive: {
        color: "#fff",
        backgroundColor: "rgba(51, 51, 51, 0.75)",
        borderColor: "rgba(51, 51, 51, 0.75)",
        marginRight: 8,
        borderRadius: 200,
        paddingVertical: 6,
        paddingHorizontal: 12,
        overflow: "hidden",
    },
});
