import React, { useState, useEffect } from 'react'
import {
    View
} from 'react-native'
import { headerLeft } from '../../../../ultis/CommonUlti'
import SafeAreaView from '../../../../components/SafeAreaView'
import _ from 'lodash'
import CustomHeader from '../../../../components/CustomHeader'
import PrimaryBlueButton from '../../../../components/PrimaryBlueButton'
import * as actions from '../../../../redux/actions'
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker'
import { normalize, normalizeV } from '../../../../ultis/Dimentions'
import { connect } from 'react-redux'

const ChangeGender = ({
    navigation,
    route,
    userInfo,
    handleChangeUserInfo,
    accessToken,
    refreshToken,
    handleGetNewToken
}) => {
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState([
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
        { label: "Other", value: "O" }
    ])
    const [selectedGender, setSelectedGender] = useState(null)

    useEffect(() => {
        if (userInfo && userInfo.gender) {
            let currentGender = gender.find(item => item.label === userInfo.gender)
            setSelectedGender(currentGender.value)
        }
    }, [])

    const _onHandleChangeGender = async () => {
        let saveGender = gender.find(item => item.value === selectedGender)
        try {
            await handleChangeUserInfo({
                _id: userInfo._id,
                gender: saveGender.label
            }, accessToken)
        } catch (e) {
            await handleGetNewToken(refreshToken, userInfo._id)
            await handleChangeUserInfo({
                _id: userInfo._id,
                gender: saveGender.label
            }, accessToken)
        }
        navigation.goBack()
    }

    return (
        <SafeAreaView>
            <CustomHeader
                headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
            />
            <View style={{
                marginTop: normalizeV(16),
                flex: 1,
                marginHorizontal: normalize(16)
            }}>
                <CustomDropDownPicker
                    open={open}
                    selectedValue={selectedGender}
                    listItems={gender}
                    setOpen={setOpen}
                    setSelectedValue={setSelectedGender}
                    setItems={setGender}
                />
            </View>

            <PrimaryBlueButton
                title="Save"
                onPress={_onHandleChangeGender}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeGender)
