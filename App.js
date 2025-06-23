import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigations/AppNavigator';
import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext'; 

export default function App() {
  return (
    <UserProvider> {}
      <CartProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </CartProvider>
    </UserProvider>
  );
}