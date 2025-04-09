import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import { Text, TouchableOpacity } from 'react-native';
import WishListScreen from './src/screens/WishListScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>  
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="WishListScreen" component={WishListScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>
  );
};

export default App;
