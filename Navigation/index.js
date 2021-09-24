import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigation from './App';
import AuthNavigation from './Auth';
import { useSelector } from 'react-redux';

function ECommerceApp() {
    const userInfo = useSelector((state) => state.app.userInfo)

    return (
        <NavigationContainer>
            {userInfo ? <AppNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    )
}


export default ECommerceApp