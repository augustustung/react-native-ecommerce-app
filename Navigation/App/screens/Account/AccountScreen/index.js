import React, { useEffect, useState } from 'react'
import {
    FlatList,
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native'
import SafeAreaView from '../../../../../components/SafeAreaView'
import CustomeHeader from '../../../../../components/CustomHeader'
import { styles } from './AccountScreenStyles'
import { fetchMenuAccount } from '../../../../../services/appService'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions'
import { emptyTitle } from '../../../../../ultis/CommonUlti'

const AccountScreen = ({ navigation }) => {
    const [menuApp, setMenuApp] = useState([])
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.app.userInfo)
    useEffect(async () => {
        let menu = await fetchMenuAccount()
        if (menu && menu.length > 0)
            setMenuApp(menu)
    }, [])

    const onPress = (item) => {
        if (item.title === "Log out")
            dispatch(actions.ProcessLogout(userInfo._id))
        else navigation.navigate(item.title)
    }

    return (
        <SafeAreaView>
            <CustomeHeader
                headerLeft={() =>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.headerTitle}>Account</Text>
                    </View>
                }
            />

            <FlatList
                data={menuApp}
                showsVerticalScrollIndicator={false}
                keyExtractor={obj => obj.title}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => onPress(item)}
                    >
                        <Image
                            source={item.image}
                            style={styles.itemImage}
                        />
                        <Text style={styles.itemName}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={emptyTitle(16)}
            />
        </SafeAreaView>
    )
}

export default AccountScreen
