import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import AccountScreen from './screens/AccountScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
     <NavigationContainer  >
       <Stack.Navigator initialRouteName='AccountScreen'>
       <Stack.Screen name="AccountScreen" component={AccountScreen} options={{headerShown: false}}/>
       </Stack.Navigator>
       
     </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height:'100%'
  },
});
