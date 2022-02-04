import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductDetailScreen from "./ProductDetailScreen";
import WeeklyDealsScreen from "./WeeklyDealsScreen";
import HomeScreen from "./HomeScreen";
import OrderScreen from './OrderScreen';
import UpdateProductScreen from './UpdateProductScreen';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen(){
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="UpdateProductScreen"
          component={UpdateProductScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="WeeklyDealsScreen"
          component={WeeklyDealsScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    );
}