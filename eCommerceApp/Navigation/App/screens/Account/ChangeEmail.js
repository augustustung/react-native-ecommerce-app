import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
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
import { normalize, normalizeV } from '../../../../ultis/Dimentions'
import { ColorConst } from '../../../../ultis/constant'
import * as actions from '../../../../redux/actions'
import Toast from 'react-native-toast-message'

const ChangeEmail = ({
    navigation,
    route,
    userInfo,
    handleChangeUserInfo,
    accessToken,
    refreshToken,
    handleGetNewToken
}) => {
    const [newEmail, setNewEmail] = useState('')
    const [emailIcon, setEmailIcon] = useState(SRC.EMAIL)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (userInfo && !_.isEmpty(userInfo))
            setNewEmail(userInfo.email)
    }, [])

    const _onHandleChangeEmail = async () => {
        if (!newEmail)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: "Email is not valid!",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        else {
            setMessage("We Will Send verification to your New Email")
            try {
                await handleChangeUserInfo({
                    _id: userInfo._id,
                    email: newEmail
                }, accessToken)
            } catch (error) {
                await handleGetNewToken(refreshToken, userInfo._id)
                await handleChangeUserInfo({
                    _id: userInfo._id,
                    email: newEmail
                }, accessToken)

            }
            navigation.goBack()
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <ScrollView>
                    <CustomHeader
                        headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                    />

                    <View style={{
                        marginTop: normalize(16),
                        flex: 1
                    }}>
                        <FormInput
                            uri={emailIcon}
                            onFocus={() => setEmailIcon(SRC.EMAIL_FOCUS)
                            }
                            onBlur={() => setEmailIcon(SRC.EMAIL)}
                            title="Change Email"
                            value={newEmail}
                            setValue={setNewEmail}
                        />
                        {message.length > 0 &&
                            <Text style={{
                                color: ColorConst.PRIMARY_BLUE,
                                fontWeight: '400',
                                fontSize: normalize(12),
                                lineHeight: normalizeV(21.6),
                                marginHorizontal: normalize(16)
                            }}>{message}</Text>
                        }
                    </View>
                </ScrollView>
                <PrimaryBlueButton
                    title="Save"
                    //dispatch aciton
                    onPress={_onHandleChangeEmail}
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


export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail)
