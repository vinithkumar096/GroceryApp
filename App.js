import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MIcon from "react-native-vector-icons/MaterialIcons";

import CartScreen from "./screens/CartScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeStackScreen from "./screens/HomeStackScreen";
import AccountStackScreen from "./screens/AccountStackScreen";
import colors from "./constants/colors";
import AuthProvider, { useAuth } from "./context/AuthProvider";
import AppStateProvider from "./context/AppStateProvider";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppLayout() {
  const { user, loading } = useAuth();

  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "";
    if (routeName === "ProductDetailScreen") return false
    if (routeName === "WeeklyDealsScreen") return false
    if (routeName === "UpdateProductScreen") return false
    if (routeName === "OrderScreen") return false
    return true
  }

  if (loading) return null

  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <NavigationContainer>
          {!user ? (
            <Stack.Navigator>
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}} />
            </Stack.Navigator>
          ):(
          <Tab.Navigator
            initialRouteName={user ? 'HomeScreen' : 'LoginScreen'}
            screenOptions={({ route }) => ({
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.white,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              title: "Grocery App",
              tabBarIcon: ({ color, size }) => {
                let iconName;
    
                if (route.name === 'Home') iconName = 'home';
                else if (route.name === 'Cart') iconName = 'cart';
                else if (route.name === 'Search') {
                  iconName = 'search';
                  return <MIcon name={iconName} size={size} color={color} />
                }
                else if (route.name === 'Favourites') iconName = 'heart-outline';
                else if (route.name === 'Account') iconName = 'account-circle';
    
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: colors.navItemActive,
              tabBarInactiveTintColor: colors.white,
              tabBarHideOnKeyboard: true,
              tabBarVisible: getTabBarVisibility(route),
              tabBarStyle: {
                height: 64,
                backgroundColor: colors.primary,
              },
              tabBarItemStyle: {
                marginVertical: 12,
              },
            })}
          >
            <Tab.Screen name="Home" options={({ route }) => ({tabBarLabel: "Home", tabBarVisible: getTabBarVisibility(route)})} component={HomeStackScreen} />
            <Tab.Screen name="Cart" options={{tabBarLabel: "Cart"}} component={CartScreen} />
            <Tab.Screen name="Search" options={{tabBarLabel: "Search"}} component={SearchScreen} />
            <Tab.Screen name="Favourites" options={{tabBarLabel: "Favourites"}} component={FavouritesScreen} />
            <Tab.Screen name="Account" options={{tabBarLabel: "Account"}} component={AccountStackScreen} />
          </Tab.Navigator>
          )}
        </NavigationContainer>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
