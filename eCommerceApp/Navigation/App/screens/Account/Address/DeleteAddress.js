import React from 'react'
import SafeAreaView from '../../../../../components/SafeAreaView'
import StatusAction from '../../../../../components/StatusAction'
import Toast from 'react-native-toast-message'
import { handleDeleteAddress } from '../../../../../services/userService'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetAllAddress } from '../../../../../redux/actions'

const DeleteAddress = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.app.userInfo)

    const _onHandleDeleteAddress = async () => {
        const id = route.params
        //do something
        let res = await handleDeleteAddress(id)
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
        navigation.goBack()
        dispatch(handleGetAllAddress(userInfo._id))

    }

    return (
        <SafeAreaView>
            <StatusAction
                title="Confirmation"
                subtitle="Are you sure wanna delete address"
                buttonTitle="Delete"
                onPress={_onHandleDeleteAddress}
                buttonSubtitle="Cancel"
                onPressSubtitle={() => navigation.goBack()}
                uri={require('../../../../../image/alert.png')}
                center
            />
        </SafeAreaView>
    )
}

export default DeleteAddress
