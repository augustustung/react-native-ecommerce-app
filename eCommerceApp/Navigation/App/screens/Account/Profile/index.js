import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { headerLeft } from '../../../../../ultis/CommonUlti'
import SafeAreaView from '../../../../../components/SafeAreaView'
import CustomHeader from '../../../../../components/CustomHeader'
import { styles } from './ProfileStyles'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { fetchUserMenu } from '../../../../../services/appService'
import Notificate from '../../../../../components/Notificate'

const Profile = ({
    navigation,
    route
}) => {
    const [userProfile, setUserProfile] = useState(null)
    const [menu, setMenu] = useState([])

    const userInfo = useSelector((state) => state.app.userInfo)

    useEffect(() => {
        if (userInfo && !_.isEmpty(userInfo))
            setUserProfile(userInfo)
    }, [userInfo])

    useEffect(async () => {
        const userMenu = await fetchUserMenu()
        if (userMenu && userMenu.length > 0)
            setMenu(userMenu)
    }, [])

    const IconLeft = (uri) => (
        <Image
            source={uri}
            style={styles.iconLeft}
        />

    )

    const getInfoContent = (id) => {
        switch (id) {
            case 0:
                return userProfile.gender
            case 1:
                return userProfile.birthday
            case 2:
                return userProfile.email
            case 3:
                return userProfile.phoneNumber
            case 4:
                return "•••••••••••••••••"
            default:
                break;
        }
    }

    const contentRight = (info) => {
        return (
            <TouchableOpacity style={styles.contentRight} onPress={() => navigation.navigate(info.title)}>
                <Text style={[styles.title, { marginTop: 0 }]}>{info.title}</Text>
                <View style={styles.notice}>
                    <Text style={styles.infomation}>{getInfoContent(info.id)}</Text>
                    <Image
                        source={require('../../../../../image/right.png')}
                        style={styles.angleRight}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    if (userProfile)
        return (
            <SafeAreaView>
                <CustomHeader
                    headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                />
                <View style={styles.wrapper}>
                    <TouchableOpacity
                        style={styles.header}
                        onPress={() => navigation.navigate('Name')}
                    >
                        <Image
                            source={{ uri: userProfile && userProfile.avatar }}
                            style={styles.avatar}
                        />
                        <View style={styles.intro}>
                            <Text style={styles.username}>{userProfile.fullName}</Text>
                            <Text style={styles.bio}>@{userProfile.email.split('@')[0].toLowerCase()}</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <FlatList
                    data={menu}
                    keyExtractor={obj => obj.title}
                    renderItem={({ item }) => (
                        <Notificate
                            contentLeft={() => IconLeft(item.image)}
                            contentRight={() => contentRight(item)}
                        />
                    )}
                />
            </SafeAreaView>
        )
    return <></>
}

export default Profile
