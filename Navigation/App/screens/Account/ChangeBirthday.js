import React, { useState, useEffect } from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    View
} from 'react-native'
import { headerLeft } from '../../../../ultis/CommonUlti'
import SafeAreaView from '../../../../components/SafeAreaView'
import _ from 'lodash'
import CustomHeader from '../../../../components/CustomHeader'
import PrimaryBlueButton from '../../../../components/PrimaryBlueButton'
import Calendar from '../../../../components/CustomCalendar'
import moment from 'moment'
import { normalize, normalizeV } from '../../../../ultis/Dimentions'
import { ColorConst } from '../../../../ultis/constant'
import * as actions from '../../../../redux/actions'
import { connect } from 'react-redux'

const ChangeBirthday = ({
    navigation,
    route,
    userInfo,
    handleChangeUserInfo,
    accessToken,
    refreshToken,
    handleGetNewToken
}) => {
    const [birthday, setBirthday] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (userInfo && userInfo.birthday)
            setBirthday(userInfo.birthday)
        else
            setBirthday(moment(new Date()).format('L').split('/').join("-"))
    }, [])

    const onChangeBirthday = async () => {
        try {
            await handleChangeUserInfo({
                _id: userInfo._id,
                birthday: birthday
            }, accessToken)

        } catch (error) {
            await handleGetNewToken(refreshToken, userInfo._id)
            await handleChangeUserInfo({
                _id: userInfo._id,
                birthday: birthday
            }, accessToken)
        }
        navigation.goBack()
    }

    return (
        <SafeAreaView>
            <CustomHeader
                headerLeft={() => headerLeft({ navigation: navigation, routeName: "Birthday" })}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Your Birthday</Text>
                <TouchableOpacity style={[styles.selectDate, {
                    borderColor: open ? "#40BFFF" : "#EBF0FF"
                }]}
                    onPress={() => setOpen(prev => !prev)}
                >
                    <Text style={styles.birthday}>{birthday.toString()}</Text>
                    <Image
                        source={open ?
                            require('../../../../image/user/birthday.png') :
                            require('../../../../image/user/birthdayGrey.png')
                        }
                        style={styles.icon}
                    />
                </TouchableOpacity>

                {open && <Calendar
                    selectedDay={birthday}
                    setSelectedDay={(value) => {
                        const fomarted = moment(value).format('L').split('/').join('-')
                        setBirthday(fomarted)
                    }}
                />}

                <Text style={{ marginBottom: normalize(24) }} />
            </View>
            <PrimaryBlueButton
                title="Save"
                onPress={onChangeBirthday}
                marginBottom={normalizeV(16)}
            />
        </SafeAreaView>
    )
}


const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo,
        accessToken: state.app.accessToken,
        refreshToken: state.app.refreshToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleChangeUserInfo: (data, token) => dispatch(actions.handleChangeUserInfo(data, token)),
        handleGetNewToken: (refreshToken, userId) => dispatch(actions.handleGenerateNewToken(refreshToken, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChangeBirthday)

const styles = StyleSheet.create({
    title: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalizeV(21),
        marginLeft: normalize(16),
        marginTop: normalizeV(16)
    },
    selectDate: {
        marginHorizontal: normalize(16),
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: normalizeV(12),
        alignItems: "center",
        paddingHorizontal: normalize(16),
        paddingVertical: normalizeV(13),
        justifyContent: 'space-between',
        marginBottom: normalizeV(11)
    },
    birthday: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '700',
        fontSize: normalize(12),
        lineHeight: normalizeV(21.6)
    },
    icon: {
        width: normalize(24),
        height: normalize(24)
    }
})