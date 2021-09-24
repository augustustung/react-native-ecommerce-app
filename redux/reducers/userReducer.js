import { actionTypes } from '../actions/actionsTypes'

const initUserState = {
    wishlist: [],
    cart: [],
    superFlashSale: [],
    flashSale: [],
    megaSale: [],
    recommendProducts: [],
    homeData: {},
    homeCategory: [],
    manCategory: [],
    womanCategory: [],
    allCategory: {},
    address: [],
    isLoading: false
}

const UserReducer = (state = initUserState, action) => {
    switch (action.type) {
        case actionTypes.PROCESS_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_DATA_HOME_SUCCESS:
            return {
                ...state,
                homeData: action.payload,
                isLoading: false,
            }
        case actionTypes.FETCH_DATA_WISHLIST_SUCCESS:
            return {
                ...state,
                wishlist: action.payload,
                isLoading: false
            }
        case actionTypes.FETCH_DATA_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cart: action.payload
            }
        case actionTypes.FETCH_DATA_SUPER_FLASHSALE_SUCCESS:
            return {
                ...state,
                superFlashSale: action.payload,
                isLoading: false
            }
        case actionTypes.FETCH_DATA_RECOMMEND_SUCCESS:
            return {
                ...state,
                recommendProducts: action.payload,
                isLoading: false
            }
        case actionTypes.FETCH_HOME_CATEGORY_SUCCESS:
            return {
                ...state,
                homeCategory: action.payload,
                isLoading: false
            }
        case actionTypes.FETCH_ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allCategory: action.payload
            }
        case actionTypes.FETCH_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                address: action.payload
            }
        case actionTypes.CHANGE_QUANTITY:
        case actionTypes.CHANGE_CART:
        case actionTypes.PROCESS_ACTION_FAILED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default UserReducer