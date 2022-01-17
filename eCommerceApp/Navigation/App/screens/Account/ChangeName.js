import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native'
import { headerLeft } from '../../../../ultis/CommonUlti'
import _ from 'lodash'
import {
    SafeAreaView,
     CustomHeader,
        FormInput,
        PrimaryBlueButton
} from '../../../../components/index'
import * as actions from '../../../../redux/actions'
import { normalizeV, normalize } from '../../../../ultis/Dimentions'
import Toast from 'react-native-toast-message'
import { connect } from 'react-redux'

const ChangeName = ({
    navigation,
    route,
    userInfo,
    handleChangeUserInfo,
    accessToken,
    refreshToken,
    handleGetNewToken
}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        if (userInfo && !_.isEmpty(userInfo)) {
            let userName = userInfo.fullName.split(" ")
            setFirstName(userName[0])
            setLastName(userName[1])
        }
    }, [])

    const _onHandleChangeName = async () => {
        if (!firstName || !lastName)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: "Your name is not valid!",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        else {
            let newUserName = `${firstName} ${lastName}`
            try {
                await handleChangeUserInfo({
                    _id: userInfo._id,
                    fullName: newUserName
                }, accessToken)
            } catch (e) {
                await handleGetNewToken(refreshToken, userInfo._id)
                await handleChangeUserInfo({
                    _id: userInfo._id,
                    fullName: newUserName
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
                        marginTop: normalize(16),
                        flex: 1
                    }}>
                        <FormInput
                            title="First Name"
                            value={firstName}
                            setValue={setFirstName}
                        />
                        <View style={{ height: normalize(24) }} />
                        <FormInput
                            title="Last Name"
                            value={lastName}
                            setValue={setLastName}
                        />
                    </View>
                </ScrollView>
                <PrimaryBlueButton
                    title="Save"
                    //dispatch aciton
                    onPress={_onHandleChangeName}
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


export default connect(mapStateToProps, mapDispatchToProps)(ChangeName)
