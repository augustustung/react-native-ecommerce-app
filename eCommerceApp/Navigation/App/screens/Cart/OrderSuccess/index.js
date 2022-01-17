import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SafeAreaView from '../../../../../components/SafeAreaView'
import StatusAction from '../../../../../components/StatusAction'
import { calculateOrResetBill, getDataCart } from '../../../../../redux/actions'

const OrderSuccess = ({ navigation }) => {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.app.userInfo)

    return (
        <SafeAreaView>
            <StatusAction
                uri={require('../../../../../image/success.png')}
                title="Success"
                subtitle="thank you for shopping using lafyuu"
                buttonTitle="Back To Order"
                onPress={() => {
                    dispatch(calculateOrResetBill("RESET"))
                    dispatch(getDataCart(userInfo._id))
                    navigation.popToTop()
                }}
                center
            />
        </SafeAreaView>
    )
}

export default OrderSuccess
