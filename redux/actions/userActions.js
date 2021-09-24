import { actionTypes } from './actionsTypes'
import * as FUNCTION from '../../services/userService'
import _ from 'lodash'
import Toast from 'react-native-toast-message'
import { USER_ACTION_INTERFACE } from '../../ultis/constant'

export const getHomeData = (userInfo) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.PROCESS_ACTION })
            let flashSale = await FUNCTION.fetchTopDataFlashSale(6)
            let megaSale = await FUNCTION.fetchTopDataMegaSale(6)
            let recommendProducts = await FUNCTION.fetchRecommendProducts(userInfo)
            if (
                flashSale && flashSale.errCode === 0 &&
                megaSale && megaSale.errCode === 0 &&
                recommendProducts && recommendProducts.errCode === 0
            )
                dispatch({
                    type: actionTypes.FETCH_DATA_HOME_SUCCESS,
                    payload: {
                        flashSale: flashSale.data,
                        megaSale: megaSale.data,
                        recommendProducts: recommendProducts.data
                    }
                })
            else
                dispatch({
                    type: actionTypes.PROCESS_ACTION_FAILED
                })
        } catch (e) {
            console.log("fetch data home failed: ", e)
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
        }
    }
}

export const getDataWishlist = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.PROCESS_ACTION
            })

            let whislist = await FUNCTION.fetchDataWishlist(userId)
            if (whislist && whislist.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DATA_WISHLIST_SUCCESS,
                    payload: whislist.data
                })
            } else {
                dispatch({
                    type: actionTypes.PROCESS_ACTION_FAILED
                })
            }
        } catch (e) {
            console.log('fetch wishlist failed', e)
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
        }
    }
}

export const getDataCart = (userId, token) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.PROCESS_ACTION
        })

        let cart = await FUNCTION.fetchDataCart(userId, token)

        if (cart && cart.errCode === 401) {
            return USER_ACTION_INTERFACE.FAIL
        }
        if (cart && cart.errCode === 0) {
            dispatch({
                type: actionTypes.FETCH_DATA_CART_SUCCESS,
                payload: cart.data
            })
        } else {
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
        }
    }

}

export const getDataSuperSale = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.PROCESS_ACTION
            })

            let superSale = await FUNCTION.fetchDataSuperFlashSale()
            if (superSale && superSale.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DATA_SUPER_FLASHSALE_SUCCESS,
                    payload: superSale.data
                })
            } else {
                dispatch({
                    type: actionTypes.PROCESS_ACTION_FAILED
                })
            }
        } catch (e) {
            console.log('fetch super flash sale failed', e)
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
        }
    }

}

export const getDataRecommend = (userInfo, limit) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.PROCESS_ACTION
            })

            let recommend = await FUNCTION.fetchRecommendProducts(userInfo, limit)
            if (recommend && recommend.length > 0) {
                dispatch({
                    type: actionTypes.FETCH_DATA_RECOMMEND_SUCCESS,
                    payload: recommend
                })
            } else {
                dispatch({
                    type: actionTypes.PROCESS_ACTION_FAILED
                })
            }
        } catch (e) {
            console.log('fetch fetch data recommend failed', e)
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
        }
    }
}

export const getHomeCategory = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.PROCESS_ACTION
            })

            let homeCategory = await FUNCTION.fetchHomeCategory()
            if (homeCategory && homeCategory.length > 0) {
                dispatch({
                    type: actionTypes.FETCH_HOME_CATEGORY_SUCCESS,
                    payload: homeCategory
                })
            } else {
                dispatch({
                    type: actionTypes.PROCESS_ACTION_FAILED
                })
            }
        } catch (e) {
            console.log('fetch fetch home category failed', e)
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
        }
    }
}

export const getAllCategory = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.PROCESS_ACTION
            })

            let allCategory = await FUNCTION.fetchAllCategory()
            if (allCategory && !_.isEmpty(allCategory)) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CATEGORY_SUCCESS,
                    payload: allCategory
                })
            } else {
                dispatch({
                    type: actionTypes.PROCESS_ACTION_FAILED
                })
            }
        } catch (e) {
            console.log('fetch fetch all category failed', e)
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
        }
    }
}

export const handleChangeWishlist = (dataAction, token) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.PROCESS_APP_ACTION })
        let res = await FUNCTION.handleChangeFavorite(dataAction, token)

        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.HANDLE_CHANGE_WISHLIST_SUCCESS
            })

            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Successfully',
                text2: res.message,
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        } else {
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: res && res.errMessage ? res.errMessage : "Error From Server!",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        }
    }
}

export const handleChangeCart = (data, token) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.PROCESS_ACTION })
        const res = await FUNCTION.handleChangeCart(data, token)

        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.CHANGE_CART
            })
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Successfully',
                text2: res.message,
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        } else {
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Eror',
                text2: "Error from server!",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        }


    }
}

export const handleChangeQuantity = (data, token) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.PROCESS_ACTION })
        let res = await FUNCTION.handleChangeQuantity(data, token)

        if (res && res.errCode === 0)
            dispatch({
                type: actionTypes.CHANGE_QUANTITY
            })
        else {
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
        }

    }
}

export const calculateOrResetBill = (action, cart) => {
    return async (dispatch) => {
        if (action === "BUY") {
            const data = await FUNCTION.calculateBill(cart)

            dispatch({
                type: actionTypes.CALCULATE_BILL,
                payload: data
            })
        }
        else
            dispatch({
                type: actionTypes.RESET_BILL
            })
    }
}

export const handleChangeUserInfo = (data, token) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.PROCESS_APP_ACTION
        })
        const res = await FUNCTION.handleChangeUserInfo(data, token)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.CHANGE_USER_INFO,
                payload: res.data
            })
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Successfully',
                text2: "Change information succeed!",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        }
        else {
            dispatch({ type: actionTypes.PROCESS_ACTION_FAILED })
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

export const handleGetAllAddress = (userId, token) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.PROCESS_ACTION
        })
        const res = await FUNCTION.handleGetUserAddress(userId, token)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.FETCH_USER_ADDRESS_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: actionTypes.PROCESS_ACTION_FAILED
            })
        }
    }
}