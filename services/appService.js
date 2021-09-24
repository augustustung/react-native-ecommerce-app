import * as DATA from '../ultis/dataWithImage'
import { USER_ACTION_INTERFACE } from '../ultis/constant'
import axios from '../axios'

export const fetchDataPayment = () => {
    return DATA.PAYMENT
}

export const fetchMenuAccount = () => {
    return DATA.MENU_ACCOUNT
}

export const fetchUserMenu = () => {
    return DATA.USER_MENU
}

export const handleGetNewToken = async (data) => {
    try {
        const res = await axios.post('/refreshToken', data)
        if (res)
            return res.errCode === 0 ?
                res.accessToken :
                USER_ACTION_INTERFACE.FAIL

    } catch (e) {
        return USER_ACTION_INTERFACE.FAIL
    }
}