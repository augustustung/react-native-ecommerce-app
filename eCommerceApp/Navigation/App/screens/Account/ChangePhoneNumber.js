import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native'
import { headerLeft } from '../../../../ultis/CommonUlti'
import {
    SafeAreaView,
     CustomHeader,
        FormInput,
        PrimaryBlueButton
} from '../../../../components/index'
import { connect } from 'react-redux'
import _ from 'lodash'
import { SRC } from '../../../../ultis/src'
import { normalizeV } from '../../../../ultis/Dimentions'
import * as actions from '../../../../redux/actions'
import Toast from 'react-native-toast-message'

const ChangePhonNumber = ({
    navigation,
    route,
    userInfo,
    handleChangeUserInfo,
    accessToken,
    refreshToken,
    handleGetNewToken
}) => {
    const [newPhone, setNewPhone] = useState('')
    const [phoneIcon, setPhoneIcon] = useState(SRC.PHONE)

    useEffect(() => {
        if (userInfo && userInfo.phoneNumber)
            setNewPhone(userInfo.phoneNumber)
    }, [])

    const handleChangePhoneNumber = async () => {
        if (!newPhone)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: "Phone number is not valid!",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        else {
            try {
                await handleChangeUserInfo({
                    _id: userInfo._id,
                    phoneNumber: newPhone
                }, accessToken)
            } catch (error) {
                await handleGetNewToken(refreshToken, userInfo._id)
                await handleChangeUserInfo({
                    _id: userInfo._id,
                    phoneNumber: newPhone
                }, accessToken)
            }
            navigation.goBack()
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <CustomHeader
                    headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                />
                <ScrollView>
                    <View style={{
                        marginTop: normalizeV(16),
                        flex: 1
                    }}>
                        <FormInput
                            uri={phoneIcon}
                            onFocus={() => setPhoneIcon(SRC.PHONE_FOCUS)}
                            onBlur={() => setPhoneIcon(SRC.PHONE)}
                            title="Phone Number"
                            placeholder="Your phone number"
                            value={newPhone}
                            setValue={setNewPhone}
                            keyboardType="numeric"
                        />
                    </View>
                </ScrollView>
                <PrimaryBlueButton
                    title="Save"
                    //dispatch aciton
                    onPress={handleChangePhoneNumber}
                    marginBottom={normalizeV(16)}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
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


export default connect(mapStateToProps, mapDispatchToProps)(ChangePhonNumber)
