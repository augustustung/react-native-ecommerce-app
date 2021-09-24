import React from 'react'
import SafeAreaView from '../../../../../components/SafeAreaView'
import StatusAction from '../../../../../components/StatusAction'
import Toast from 'react-native-toast-message'
import { handleDeleteAddress } from '../../../../../services/userService'
import { connect } from 'react-redux'
import * as actions from '../../../../../redux/actions'

const DeleteAddress = ({
    navigation,
    route,
    userInfo,
    accessToken,
    refreshToken,
    handleGetNewToken,
    getAllAddress
}) => {

    const _onHandleDeleteAddress = async () => {
        const id = route.params
        //do something
        let res = {}
        try {
            res = await handleDeleteAddress(id, accessToken)
            await getAllAddress(userInfo._id, accessToken)
        } catch (e) {
            await handleGetNewToken(refreshToken, userInfo._id)
            res = await handleDeleteAddress(id, accessToken)
            await getAllAddress(userInfo._id, accessToken)
        }
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
        handleGetNewToken: (refreshToken, userId) => dispatch(actions.handleGenerateNewToken(refreshToken, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DeleteAddress)
