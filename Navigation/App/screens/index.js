import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeSceen from './Home/HomeScreen'
import ExploreScreen from './Explore/ExploreScreen';
import { Image, View, Text } from 'react-native';
import CartScreen from './Cart/CartScreen';
import OfferScreen from './Offer/OfferScreen';
import AccountScreen from './Account/AccountScreen';
import { styles } from './Home/HomeScreen/HomeScreenStyle'

const Tab = createBottomTabNavigator();


function HomeStackScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let uri;

                    if (route.name === 'Home') {
                        uri = focused
                            ? require('../../../image/Tab/HomeFocus.png')
                            : require('../../../image/Tab/Home.png');
                    } else if (route.name === 'Explore') {
                        uri = focused
                            ? require('../../../image/Tab/SearchFocus.png')
                            : require('../../../image/Tab/Search.png')
                    } else if (route.name === 'Your Cart') {
                        uri = focused
                            ? require('../../../image/Tab/CartFocus.png')
                            : require('../../../image/Tab/Cart.png')
                    }
                    else if (route.name === 'Offer') {
                        uri = focused
                            ? require('../../../image/Tab/OfferFocus.png')
                            : require('../../../image/Tab/Offer.png')
                    }
                    else if (route.name === 'Account') {
                        uri = focused
                            ? require('../../../image/Tab/UserFocus.png')
                            : require('../../../image/Tab/User.png')
                    }

                    // You can return any component that you like here!
                    return <Image source={uri} style={styles.tabBar} />;
                },
                tabBarActiveTintColor: '#40BFFF',
                tabBarInactiveTintColor: '#9098B1',
                headerShown: false
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeSceen}
            />
            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
            />
            <Tab.Screen
                name="Your Cart"
                component={CartScreen}
            />
            <Tab.Screen
                name="Offer"
                component={OfferScreen}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
            />
        </Tab.Navigator>
    );
}

export default HomeStackScreen;