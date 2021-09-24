import { actionTypes } from './actionsTypes'
import * as FUNCTION from '../../services/appService'
import { USER_ACTION_INTERFACE } from '../../ultis/constant'
import { logOut } from '../../services/userService'
import Toast from 'react-native-toast-message'

export const ProcessLogin = (userInfo, accessToken, refreshToken) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.PROCESS_APP_ACTION })
        if (userInfo)
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: {
                    userInfo: userInfo,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            })
        else
            dispatch({ type: actionTypes.LOGIN_FAIL })
    }
}

export const ProcessLogout = (userId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.PROCESS_APP_ACTION })
        await logOut(userId)
        dispatch({ type: actionTypes.LOG_OUT })
    }
}

export const getDataPayment = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.PROCESS_APP_ACTION })
            let data = await FUNCTION.fetchDataPayment()
            if (data && data.length > 0)
                dispatch({ type: actionTypes.FETCH_DATA_PAYMENT, payload: data })
            else
                dispatch({ type: actionTypes.PROCESS_APP_ACTION_FAILED })
        } catch (e) {
            dispatch({ type: actionTypes.PROCESS_APP_ACTION_FAILED })
        }
    }
}


export const handleGenerateNewToken = (refreshToken, userId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.PROCESS_APP_ACTION })
        const res = await FUNCTION.handleGetNewToken({
            userId: userId,
            token: refreshToken
        })

        if (res === USER_ACTION_INTERFACE.FAIL) {
            dispatch({ type: actionTypes.FETCH_NEW_TOKEN_FAILED })
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Session Time Out!',
                text2: "Please Login Again.",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        }
        else
            dispatch({
                type: actionTypes.FETCH_NEW_TOKEN_SUCCESS,
                payload: res
            })
    }
}