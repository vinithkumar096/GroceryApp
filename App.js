import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AccountScreen from "./screens/AccountScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Account : AccountScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Cart: CartScreen,
    Search: SearchScreen,  
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
      headerShown: false,
    },
  }
);

export default createAppContainer(navigator);
