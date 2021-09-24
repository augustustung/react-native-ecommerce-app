import React, { useState, useEffect } from 'react'
import {
    FlatList,
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'
import { emptyTitle, headerLeft } from '../../../../../ultis/CommonUlti'
import SafeAreaView from '../../../../../components/SafeAreaView'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import CustomHeader from '../../../../../components/CustomHeader'
import { fetchDataListOrder } from '../../../../../services/userService'
import { handleGenerateNewToken } from '../../../../../redux/actions'
import { styles } from './OrderStyles'
import { normalizeV } from '../../../../../ultis/Dimentions'

const Order = ({ navigation, route }) => {
    const [listOrder, setListOrder] = useState([])

    const userInfo = useSelector(state => state.app.userInfo)
    const accessToken = useSelector(state => state.app.accessToken)
    const refreshToken = useSelector(state => state.app.refreshToken)
    const dispatch = useDispatch()

    useEffect(async () => {
        let res = {}
        try {
            res = await fetchDataListOrder(userInfo._id, accessToken)
        } catch (e) {
            await dispatch(handleGenerateNewToken(refreshToken, userInfo._id))
            res = await fetchDataListOrder(userInfo._id, accessToken)
        }

        if (res && res.errCode === 0) {
            await buildData(res.data, res.allcodeShipping)
        }
    }, [])

    const buildData = async (data, allcodeShipping) => {
        for (let i = 0; i < data.length; i++) {
            const statusData = await allcodeShipping.find(item => item.keyMap === data[i].status)
            data[i].statusData = statusData.keyMap
        }
        setListOrder(data)
    }

    const renderItem = (item) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Order Detail", item._id)}
        >
            <Text style={styles.id}>{item.id}</Text>
            <Text style={styles.text}>Order at Lafyuu : {item.orderAt}</Text>

            <Image
                source={require('../../../../../image/line.png')}
                style={styles.divide}
            />

            <View style={styles.sections}>
                <Text style={styles.text}>Order Status</Text>
                <Text style={styles.sectionContent}>{item.statusData.title}</Text>
            </View>

            <View style={styles.sections}>
                <Text style={styles.text}>Items</Text>
                <Text style={styles.sectionContent}>{item.productId.length} Items purchased</Text>
            </View>

            <View style={styles.sections}>
                <Text style={styles.text}>Price</Text>
                <Text style={[styles.sectionContent, { color: "#40BFFF" }]}>${item.total}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView>
            <CustomHeader
                headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
            />

            <FlatList
                data={listOrder}
                keyExtractor={obj => obj._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => renderItem(item)}
                ListEmptyComponent={emptyTitle(normalizeV(16), "You don't have any order. Shopping Now")}
            />

        </SafeAreaView>
    )
}

export default Order
