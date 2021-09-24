import * as React from 'react';
import HomeStackScreen from './screens';
import SuperFlashSale from './SuperFlashSale';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteProducts from './FavoriteProducts';
import DetailProducts from './DetailProduct'
import ReviewProduct from './ReviewProduct';
import WriteReview from './WriteReview';
import Notification from './Notification';
import Offer from './Offer';
import Feed from './Feed';
import Activity from './Activity';
import Ship from './screens/Cart/Ship';
import SearchResult from './SearchResult';
import Category from './Category';
import SortBy from './SortBy';
import FilterSearch from './FilterSearch';
import Payment from './Payment';
import ChooseCard from './screens/Cart/ChooseCard';
import OrderSuccess from './screens/Cart/OrderSuccess';
import Profile from './screens/Account/Profile';
import ChangeName from './screens/Account/ChangeName';
import ChangeEmail from './screens/Account/ChangeEmail';
import ChangeGender from './screens/Account/ChangeGender';
import ChangePhonNumber from './screens/Account/ChangePhoneNumber';
import ChangePassword from './screens/Account/ChangePassword';
import ChangeBirthday from './screens/Account/ChangeBirthday';
import Order from './screens/Account/Order';
import OrderDetail from './screens/Account/Order/OrderDetail';
import Address from './screens/Account/Address';
import AddOrEditAddress from './screens/Account/Address/AddOrEditAddress';
import DeleteAddress from './screens/Account/Address/DeleteAddress';
import ViewCard from './screens/Account/Payment/ViewCard';
import CreateCard from './screens/Account/Payment/CreateCard'
import ConfirmCard from './screens/Account/Payment/ConfirmCard';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="App" component={HomeStackScreen} />
            <Stack.Screen name="Super Flash Sale" component={SuperFlashSale} />
            <Stack.Screen name="Favorite Product" component={FavoriteProducts} />
            <Stack.Screen name="Detail Product" component={DetailProducts} />
            <Stack.Screen name="Review Product" component={ReviewProduct} />
            <Stack.Screen name="Write Review" component={WriteReview} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Offer" component={Offer} />
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Screen name="Activity" component={Activity} />
            <Stack.Screen name="Ship" component={Ship} />
            <Stack.Screen name="Search Result" component={SearchResult} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Sort By" component={SortBy} />
            <Stack.Screen name="Filter Search" component={FilterSearch} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Choose Card" component={ChooseCard} />
            <Stack.Screen name="Order Success" component={OrderSuccess} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Name" component={ChangeName} />
            <Stack.Screen name="Email" component={ChangeEmail} />
            <Stack.Screen name="Gender" component={ChangeGender} />
            <Stack.Screen name="Birthday" component={ChangeBirthday} />
            <Stack.Screen name="Phone Number" component={ChangePhonNumber} />
            <Stack.Screen name="Change Password" component={ChangePassword} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Order Detail" component={OrderDetail} />
            <Stack.Screen name="Address" component={Address} />
            <Stack.Screen name="Add Or Edit Address" component={AddOrEditAddress} />
            <Stack.Screen name="Delete Address" component={DeleteAddress} />
            <Stack.Screen name="View Card" component={ViewCard} />
            <Stack.Screen name="Create Card" component={CreateCard} />
            <Stack.Screen name="Save Card" component={ConfirmCard} />
        </Stack.Navigator>
    );
}

export default AppNavigation;

