import React, { useState } from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    ScrollView
} from 'react-native'
import { headerLeft } from '../../../../ultis/CommonUlti'
import SafeAreaView from '../../../../components/SafeAreaView'
import { connect } from 'react-redux'
import _ from 'lodash'
import CustomHeader from '../../../../components/CustomHeader'
import FormInput from '../../../../components/FormInput'
import PrimaryBlueButton from '../../../../components/PrimaryBlueButton'
import { SRC } from '../../../../ultis/src'
import { ColorConst } from '../../../../ultis/constant'
import { normalize, normalizeV } from '../../../../ultis/Dimentions'
import Toast from 'react-native-toast-message'
import { handleChangePassword } from '../../../../services/userService'
import { handleGenerateNewToken } from '../../../../redux/actions'

const errMessage = {
    marginHorizontal: normalize(16),
    fontWeight: "700",
    color: ColorConst.PRIMARY_RED,
    fontSize: normalize(12),
    lineHeight: normalize(18),
    marginTop: normalizeV(8),
    marginBottom: normalizeV(24)
}

const ChangePassword = ({
    navigation,
    route,
    userInfo,
    accessToken,
    refreshToken,
    handleGetNewToken
}) => {
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmNewPass, setConfirmNewPass] = useState('')

    const [oldPassIcon, setOldPassIcon] = useState(SRC.PASSWROD)
    const [newPassIcon, setNewPassIcon] = useState(SRC.PASSWROD)
    const [cfNewPassIcon, setCfNewPassIcon] = useState(SRC.PASSWROD)

    const [oldPassBorder, setOldPassBorder] = useState(null)
    const [newPassBorder, setNewPassBorder] = useState(null)
    const [cfNewPassBorder, setCfNewPassBorder] = useState(null)


    const [oldPassWrong, setOldPassWrong] = useState('')
    const [newPassDontMatch, setNewPassDontMatch] = useState('')
    const [inputInvalid, setInputInvalid] = useState('')

    const validatePassword = () => {
        if (!oldPass || !newPass || !confirmNewPass) {
            setInputInvalid(" Please fill in all input")
            setOldPassBorder(ColorConst.PRIMARY_RED)
            setNewPassBorder(ColorConst.PRIMARY_RED)
            setCfNewPassBorder(ColorConst.PRIMARY_RED)
            setOldPassIcon(SRC.PASSWROD_WRONG)
            setNewPassIcon(SRC.PASSWROD_WRONG)
            setCfNewPassIcon(SRC.PASSWROD_WRONG)
            return false
        }
        if (newPass && confirmNewPass && newPass !== confirmNewPass) {
            setNewPassDontMatch(" Your new password don't match")
            setCfNewPassBorder(ColorConst.PRIMARY_RED)
            setNewPassBorder(ColorConst.PRIMARY_RED)
            setNewPassIcon(SRC.PASSWROD_WRONG)
            setCfNewPassIcon(SRC.PASSWROD_WRONG)
            return false
        }

        return true
    }

    const _onHandleChangePass = async () => {
        Keyboard.dismiss()
        setOldPassBorder(null)
        setNewPassBorder(null)
        setCfNewPassBorder(null)
        oldPassWrong.length > 0 ? setOldPassWrong('') : 0
        newPassDontMatch.length > 0 ? setNewPassDontMatch("") : 0
        inputInvalid.length > 0 ? setInputInvalid("") : 0
        let valid = validatePassword()
        let res = {}
        if (!valid)
            return

        try {
            res = await handleChangePassword({
                userId: userInfo._id,
                oldPass: oldPass,
                newPass: newPass
            }, accessToken)
        } catch (error) {
            await handleGetNewToken(refreshToken, userInfo._id)
            res = await handleChangePassword({
                userId: userInfo._id,
                oldPass: oldPass,
                newPass: newPass
            }, accessToken)
        }
        if (res) {
            if (res && res.errCode === 0) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully',
                    text2: res.message,
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                })
                navigation.goBack()
            } else if (res.errCode === 2) {
                setOldPassWrong(res.errMessage)
                setOldPassBorder(ColorConst.PRIMARY_RED)
                setOldPassIcon(SRC.PASSWROD_WRONG)
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <CustomHeader
                    headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        marginTop: normalizeV(16),
                        flex: 1
                    }}>
                        <FormInput
                            uri={oldPassIcon}
                            onFocus={() => setOldPassIcon(SRC.PASSWROD_FOCUS)}
                            onBlur={() => setOldPassIcon(SRC.PASSWROD)}
                            borderColor={oldPassBorder}
                            secureTextEntry={true}
                            title="Old Password"
                            placeholder="Type your password"
                            value={oldPass}
                            setValue={setOldPass}
                        />
                        {!oldPassWrong.length > 0 && <View style={{ height: normalizeV(24) }} />}
                        {oldPassWrong.length > 0 && <Text style={errMessage}>{oldPassWrong}</Text>}
                        <FormInput
                            uri={newPassIcon}
                            onFocus={() => {
                                setNewPassIcon(SRC.PASSWROD_FOCUS)
                            }}
                            onBlur={() => setNewPassIcon(SRC.PASSWROD)
                            }
                            secureTextEntry={true}
                            placeholder="Type your new password"
                            borderColor={newPassBorder}
                            title="New Password"
                            value={newPass}
                            setValue={setNewPass}
                        />
                        {!newPassDontMatch.length > 0 && <View style={{ height: normalizeV(24) }} />}
                        {newPassDontMatch.length > 0 && <Text style={errMessage}>{newPassDontMatch}</Text>}
                        <FormInput
                            uri={cfNewPassIcon}
                            onFocus={() => {
                                setCfNewPassIcon(SRC.PASSWROD_FOCUS)
                                setCfNewPassBorder("#40BFFF")
                            }}
                            onBlur={() => {
                                setCfNewPassIcon(SRC.PASSWROD)
                                setCfNewPassBorder("#EBF0FF")
                            }}
                            placeholder="Confirm your new password"
                            borderColor={cfNewPassBorder}
                            title="Confirm New Password"
                            secureTextEntry={true}
                            value={confirmNewPass}
                            setValue={setConfirmNewPass}
                        />
                        {inputInvalid.length > 0 && <Text style={errMessage}>{inputInvalid}</Text>}
                    </View>
                </ScrollView>
                <PrimaryBlueButton
                    title="Save"
                    onPress={_onHandleChangePass}
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
        handleGetNewToken: (refreshToken, userId) => dispatch(handleGenerateNewToken(refreshToken, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)