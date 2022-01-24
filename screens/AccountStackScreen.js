import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountScreen from "./AccountScreen";
import AddProductScreen from './AddProductScreen';
import OrderScreen from "./OrderScreen";
import ViewOrdersScreen from './ViewOrdersScreen';

const AccountStack = createNativeStackNavigator();

export default function AccountStackScreen(){
    return (
        <AccountStack.Navigator>
          <AccountStack.Screen
            name="AccountScreen"
            component={AccountScreen}
            options={{headerShown: false}}
          />
          <AccountStack.Screen
            name="OrderScreen"
            component={OrderScreen}
            options={{ headerShown: false }}
          />
          <AccountStack.Screen
            name="ViewOrdersScreen"
            component={ViewOrdersScreen}
            options={{ headerShown: false }}
          />
          <AccountStack.Screen
            name="AddProductScreen"
            component={AddProductScreen}
            options={{ headerShown: false }}
          />
        </AccountStack.Navigator>
    );
}
