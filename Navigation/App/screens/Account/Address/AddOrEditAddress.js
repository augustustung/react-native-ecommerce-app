import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import CustomHeader from '../../../../../components/CustomHeader'
import SafeAreaView from '../../../../../components/SafeAreaView'
import { headerLeft } from '../../../../../ultis/CommonUlti'
import PrimaryBlueButton from '../../../../../components/PrimaryBlueButton'
import { getAllcodeType, handleAddAnAddress } from '../../../../../services/userService'
import CustomDropDownPicker from '../../../../../components/CustomDropDownPicker'
import FormInput from '../../../../../components/FormInput'
import { styles } from './AddressStyles'
import { connect } from 'react-redux'
import _ from 'lodash'
import Toast from 'react-native-toast-message'
import { normalizeV } from '../../../../../ultis/Dimentions'
import { USER_ACTION_INTERFACE } from '../../../../../ultis/constant'
import { handleGetUserAddressById, handleUpdateAnAddress } from '../../../../../services/userService'
import * as actions from '../../../../../redux/actions'

function AddOrEditAddress({
    navigation,
    route,
    userInfo,
    accessToken,
    refreshToken,
    handleGetNewToken,
    getAllAddress
}) {
    const [listCountry, setListCountry] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [open, setOpen] = useState(false)
    const [addInfo, setAddInfo] = useState({
        firstName: '',
        lastName: '',
        streetAdd1: '',
        streetAdd2: '',
        city: '',
        detail: '',
        zipCode: '',
        phoneNumber: ''
    })

    const [borderColor, setBorderColor] = useState({
        borderCountryColor: null,
        borderFirstName: null,
        borderLastName: null,
        borderStreetAdd1: null,
        borderCity: null,
        borderDetailCity: null,
        borderZipCode: null,
        borderPhoneNumber: null
    })

    useEffect(async () => {
        let res = await getAllcodeType(USER_ACTION_INTERFACE.COUNTRY)
        if (res && res.errCode === 0) {
            setListCountry(buildCountryData(res.data))
        }
    }, [])

    useEffect(async () => {
        //add or passing id to find
        const action = route.params
        if (action === "ADD")
            return
        else {
            let res = {}
            try {
                res = await handleGetUserAddressById(action, accessToken)
            } catch (error) {
                await handleGetNewToken(refreshToken, userInfo._id)
                res = await handleGetUserAddressById(action, accessToken)
            }
            if (res && res.errCode === 0) {
                const address = res.data
                setAddInfo({
                    firstName: address.firstName,
                    lastName: address.lastName,
                    streetAdd1: address.streetAdd1,
                    streetAdd2: address.streetAdd2 ? address.streetAdd2 : '',
                    city: address.city,
                    detail: address.detail,
                    zipCode: address.zipCode,
                    phoneNumber: address.phoneNumber
                })
                let country = await listCountry.length > 0 && listCountry.find(item => item.label === address.country)
                setSelectedCountry(!_.isEmpty(country) && country.value)
            }

        }
    }, [listCountry])


    const buildCountryData = (data) => {
        let re = []
        for (let i = 0; i < data.length; i++) {
            re.push({
                label: data[i].value,
                value: data[i].keyMap
            })
        }

        return re
    }

    const validateInput = () => {
        if (!selectedCountry) {
            setBorderColor(prev => ({ ...prev, borderCountryColor: "#FB7181" }))
            return false
        }
        if (!addInfo.firstName) {
            setBorderColor(prev => ({ ...prev, borderFirstName: "#FB7181" }))
            return false
        }
        if (!addInfo.lastName) {
            setBorderColor(prev => ({ ...prev, borderLastName: "#FB7181" }))
            return false
        }
        if (!addInfo.streetAdd1) {
            setBorderColor(prev => ({ ...prev, borderStreetAdd1: "#FB7181" }))
            return false
        }
        if (!addInfo.city) {
            setBorderColor(prev => ({ ...prev, borderCity: "#FB7181" }))
            return false
        }
        if (!addInfo.detail) {
            setBorderColor(prev => ({ ...prev, borderDetailCity: "#FB7181" }))
            return false
        }
        if (!addInfo.zipCode) {
            setBorderColor(prev => ({ ...prev, borderZipCode: "#FB7181" }))
            return false
        }
        if (!addInfo.phoneNumber) {
            setBorderColor(prev => ({ ...prev, borderPhoneNumber: "#FB7181" }))
            return false
        }

        return true
    }

    const _onHandleAddAddress = async () => {
        setBorderColor({
            borderCountryColor: null,
            borderFirstName: null,
            borderLastName: null,
            borderStreetAdd1: null,
            borderCity: null,
            borderDetailCity: null,
            borderZipCode: null,
            borderPhoneNumber: null
        })
        let valid = await validateInput()
        if (!valid)
            return
        else {
            //call api
            const action = route.params
            let country = await listCountry.length > 0 && listCountry.find(item => item.value === selectedCountry)
            let res = {}
            if (action === "ADD") {
                try {
                    res = await handleAddAnAddress({
                        ...addInfo,
                        country: country.label,
                        userId: userInfo._id
                    }, accessToken)
                } catch (error) {
                    await handleGetNewToken(refreshToken, userInfo._id)
                    res = await handleAddAnAddress({
                        ...addInfo,
                        country: country.label,
                        userId: userInfo._id
                    }, accessToken)
                }
            } else {
                try {
                    res = await handleUpdateAnAddress({
                        userId: userInfo._id,
                        _id: action,
                        country: country.label,
                        ...addInfo
                    }, accessToken)
                } catch (error) {
                    await handleGetNewToken(refreshToken, userInfo._id)
                    res = await handleUpdateAnAddress({
                        userId: userInfo._id,
                        _id: action,
                        country: country.label,
                        ...addInfo
                    }, accessToken)
                }
            }

            if (res.errCode === 0) {
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
                try {
                    await getAllAddress(userInfo._id, accessToken)
                } catch (error) {
                    await handleGetNewToken(refreshToken, userInfo._id)
                    await getAllAddress(userInfo._id, accessToken)
                }
                navigation.goBack()
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error',
                    text2: "Error From Server!",
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                })
            }
        }

    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomHeader
                        headerLeft={() =>
                            headerLeft({
                                navigation: navigation,
                                routeName: route.params === "ADD"
                                    ? "Add Address"
                                    : "Edit Address"
                            })}
                    />
                    <Text style={styles.title}>Country or region</Text>
                    <View style={styles.selecCountry}>
                        <CustomDropDownPicker
                            selectedValue={selectedCountry}
                            setSelectedValue={setSelectedCountry}
                            listItems={listCountry}
                            setItems={setListCountry}
                            open={open}
                            setOpen={setOpen}
                            borderColor={borderColor.borderCountryColor}
                        />
                    </View>

                    <FormInput
                        title="First Name"
                        value={addInfo.firstName}
                        setValue={(text) => setAddInfo((prev) => ({ ...prev, firstName: text }))}
                        borderColor={borderColor.borderFirstName}
                        placeholder="Your first name"
                        marginBottom={normalizeV(24)}
                    />

                    <FormInput
                        title="Last Name"
                        value={addInfo.lastName}
                        setValue={(text) => setAddInfo((prev) => ({ ...prev, lastName: text }))}
                        borderColor={borderColor.borderLastName}
                        marginBottom={normalizeV(24)}
                        placeholder="Your last name"
                    />

                    <FormInput
                        title="Street Address"
                        value={addInfo.streetAdd1}
                        setValue={(text) => setAddInfo((prev) => ({ ...prev, streetAdd1: text }))}
                        borderColor={borderColor.borderStreetAdd1}
                        marginBottom={normalizeV(24)}
                        placeholder="Street address"
                    />

                    <FormInput
                        title="Street Address 2 (Optional)"
                        value={addInfo.streetAdd2}
                        setValue={(text) => setAddInfo((prev) => ({ ...prev, streetAdd2: text }))}
                        marginBottom={normalizeV(24)}
                        placeholder="Street address (optional)"
                    />

                    <FormInput
                        title="City"
                        value={addInfo.city}
                        setValue={(text) => setAddInfo((prev) => ({ ...prev, city: text }))}
                        borderColor={borderColor.borderCity}
                        marginBottom={normalizeV(24)}
                        placeholder="City address"
                    />

                    <FormInput
                        title="State/Province/Region"
                        value={addInfo.detail}
                        setValue={(text) => setAddInfo((prev) => ({ ...prev, detail: text }))}
                        borderColor={borderColor.borderDetailCity}
                        marginBottom={normalizeV(24)}
                        placeholder="More detail"
                    />

                    <FormInput
                        title="Zip Code"
                        value={addInfo.zipCode}
                        setValue={(text) => setAddInfo((prev) => ({ ...prev, zipCode: text }))}
                        borderColor={borderColor.borderZipCode}
                        marginBottom={normalizeV(24)}
                        placeholder="Zip code"
                    />

                    <FormInput
                        title="Phone Number"
                        value={addInfo.phoneNumber}
                        setValue={(text) => setAddInfo((prev) => ({ ...prev, phoneNumber: text }))}
                        borderColor={borderColor.borderPhoneNumber}
                        keyboardType="number-pad"
                        marginBottom={normalizeV(24)}
                        placeholder="Your phone number"
                    />

                    <PrimaryBlueButton
                        title={route.params === "ADD" ? "Add Address" : "Edit Address"}
                        onPress={_onHandleAddAddress}
                        marginBottom={normalizeV(16)}
                    />
                </ScrollView>
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
        getAllAddress: (userId, token) => dispatch(actions.handleGetAllAddress(userId, token)),
        handleChangeUserInfo: (data, token) => dispatch(actions.handleChangeUserInfo(data, token)),
        handleGetNewToken: (refreshToken, userId) => dispatch(actions.handleGenerateNewToken(refreshToken, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditAddress)