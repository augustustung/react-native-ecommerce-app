import { actionTypes } from '../actions/actionsTypes'

const initAppState = {
    userInfo: null,
    isLoggedIn: false,
    process: false,
    listPayment: [],
    currentBill: null,
    accessToken: '',
    refreshToken: ''
}

const AppReducer = (state = initAppState, action) => {
    switch (action.type) {
        case actionTypes.PROCESS_APP_ACTION:
            return {
                ...state,
                process: true
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                process: false,
                isLoggedIn: true,
                userInfo: action.payload.userInfo,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                process: false
            }
        case actionTypes.LOG_OUT:
            return {
                ...state,
                userInfo: null,
                process: false,
                isLoggedIn: false
            }
        case actionTypes.FETCH_DATA_PAYMENT:
            return {
                ...state,
                process: false,
                listPayment: action.payload
            }
        case actionTypes.HANDLE_CHANGE_WISHLIST_SUCCESS:
            return {
                ...state,
                process: false,
                userInfo: {
                    ...state.userInfo,
                    "wishList": action.payload
                }
            }
        case actionTypes.CALCULATE_BILL:
            return {
                ...state,
                process: false,
                currentBill: action.payload
            }
        case actionTypes.RESET_BILL:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    "cart": []
                },
                process: false,
                currentBill: null
            }
        case actionTypes.CHANGE_USER_INFO:
            return {
                ...state,
                process: false,
                userInfo: action.payload
            }
        case actionTypes.FETCH_NEW_TOKEN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload,
                isLoading: false
            }
        case actionTypes.FETCH_NEW_TOKEN_FAILED:
            return {
                ...state,
                userInfo: null,
                isLoggedIn: false,
                isLoading: false,
                accessToken: '',
                refreshToken: ''
            }
        case actionTypes.PROCESS_APP_ACTION_FAILED:
            return {
                ...state,
                process: false
            }
        default:
            return state
    }
}

export default AppReducer