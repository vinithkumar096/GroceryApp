import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AccountScreen from "./screens/AccountScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
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
