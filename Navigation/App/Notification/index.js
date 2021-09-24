import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'
import { useSelector } from 'react-redux'
import SafeAreaView from '../../../components/SafeAreaView'
import CustomHeader from '../../../components/CustomHeader'
import { headerLeft } from '../../../ultis/CommonUlti'
import Notificate from '../../../components/Notificate'
import { styles } from './NotificationStyles'

function Notification({ navigation, route }) {
    const [listNotice, setListNotice] = useState([])

    const userInfo = useSelector((state) => state.app.userInfo)
    const { offer, feed, activity } = userInfo.notification

    useEffect(() => {
        if (userInfo.notification) {
            setListNotice([
                { image: require('../../../image/Tab/OfferFocus.png'), title: "Offer", notice: offer.length },
                { image: require('../../../image/feed.png'), title: "Feed", notice: feed.length },
                { image: require('../../../image/notice.png'), title: "Activity", notice: activity.length }
            ])
        }
    }, [])

    const IconLeft = (uri) => (
        <Image
            source={uri}
            style={styles.iconLeft}
        />

    )

    const contentRight = (info) => {
        return (
            <TouchableOpacity style={styles.contentRight} onPress={() => navigation.navigate(info.title)}>
                <Text style={[styles.title, { marginTop: 0 }]}>{info.title}</Text>
                {info.notice > 0 && (
                    <View style={styles.notice}>
                        <Text style={styles.noticeNum}>{info.notice}</Text>
                    </View>)
                }
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <CustomHeader
                headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
            />
            {
                listNotice.map((item, index) => {
                    return (
                        <Notificate
                            key={index}
                            contentLeft={() => IconLeft(item.image)}
                            contentRight={() => contentRight(item)}
                        />
                    )
                })
            }

        </SafeAreaView>
    )
}


export default Notification