import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SafeAreaView from '../../../../../components/SafeAreaView'
import StatusAction from '../../../../../components/StatusAction'
import { calculateOrResetBill, getDataCart, handleGenerateNewToken } from '../../../../../redux/actions'

const OrderSuccess = ({ navigation }) => {

    const dispatch = useDispatch()
    const { userInfo, accessToken, refreshToken } = useSelector(state => state.app)

    const _onGetNewData = () => {
        dispatch(calculateOrResetBill("RESET"))
        try {
            dispatch(getDataCart(userInfo._id, accessToken))
        } catch (e) {
            dispatch(handleGenerateNewToken(refreshToken, userInfo._id))
            dispatch(getDataCart(userInfo._id, accessToken))
        }
        navigation.popToTop()
    }

    return (
        <SafeAreaView>
            <StatusAction
                uri={require('../../../../../image/success.png')}
                title="Success"
                subtitle="thank you for shopping using lafyuu"
                buttonTitle="Back To Order"
                onPress={_onGetNewData}
                center
            />
        </SafeAreaView>
    )
}

export default OrderSuccess
