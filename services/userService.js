import * as CATEGORY from '../ultis/dataWithImage'
import _ from 'lodash'
import axios from '../axios'
import { USER_ACTION_INTERFACE } from '../ultis/constant'

export const authenticate = (data) => {
    return axios.post("/signIn", data)
}

export const register = (data) => {
    return axios.post("/signUp", data)
}

export const logOut = (userId) => {
    return axios.delete(`/signOut?userId=${userId}`)
}

export const fetchDataSuperFlashSale = () => {
    return axios.get(`/products/api/getProductsSupperFlashSale?limit=ALL`)
}

export const fetchTopDataFlashSale = (limit) => {
    if (!limit)
        limit = 6
    return axios.get(`/products/api/getTopProductsFlashsale?limit=${limit}`)
}

export const fetchTopDataMegaSale = (limit) => {
    if (!limit)
        limit = 6
    return axios.get(`/products/api/getTopProductsMegaSale?limit=${limit}`)
}

export const fetchRecommendProducts = (userInfo) => {
    return axios.get(`/products/api/getProductsRecommend?userId=${userInfo._id}`)
}

export const fetchDataCart = (userId, token) => {
    return axios.get(`/users/api/getDataCart?userId=${userId}`,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
}

export const handleChangeCart = (dataActions, token) =>
    axios.post('/users/api/addAndRemoveCart', dataActions, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const handleChangeQuantity = (dataActions, token) =>
    axios.post('/users/api/changeQuantity', dataActions, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const handleChangeFavorite = (dataActions, token) =>
    axios.post('/users/api/addAndRemoveFavorite', dataActions, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const fetchDataWishlist = (userId) => {
    return axios.get(`/products/api/getFavoriteProducts?userId=${userId}`)
}

export const fetchHomeCategory = () => {
    let re = []
    for (let i = 0; i < 3; i++) {
        re.push(CATEGORY.MAN_FASHION[i])
        re.push(CATEGORY.WOMAN_FASHION[i])
    }
    return re
}

export const fetchAllCategory = () => {
    const { MAN_FASHION, WOMAN_FASHION } = CATEGORY
    let re = {
        man: [],
        woman: []
    }
    let length = MAN_FASHION.length > WOMAN_FASHION.length
        ? MAN_FASHION.length
        : WOMAN_FASHION.length
    for (let i = 0; i < length; i++) {
        if (MAN_FASHION[i])
            re.man.push(MAN_FASHION[i])
        if (WOMAN_FASHION[i])
            re.woman.push(WOMAN_FASHION[i])
    }

    return re
}

export const findProductById = (id) => {
    return axios.get(`/products/api/getProductById?id=${id}`)
}

export const applyCuponCode = (code, token) => {
    return axios.post(`/users/api/applyCuponCode?cuponcode=${code}`, {}, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const fetchDataSearch = async (text) => {
    return axios.get(`/products/api/searchProduct?name=${text}`)
}

export const calculateBill = (cart) => {
    if (cart.length === 0)
        return null

    let sum = 0
    for (let i = 0; i < cart.length; i++) {
        const sumOfProduct = cart[i].price * cart[i].quantity
        sum += sumOfProduct
    }

    const total = Number(sum) + 40.00 + 128.00
    return {
        sumProduct: sum.toFixed(2),
        total: total.toFixed(2)
    }
}

export const fetchDataListOrder = (userId, token) => {
    return axios.get(`/users/api/getUserOrders?userId=${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const fineOrderById = async (orderCode, token) => {
    return axios.get(`/users/api/getOrderById?orderCode=${orderCode}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const getAllcodeType = (type) => {
    return axios.get(`/app/api/getAllcode?type=${type}`)
}

export const handleChangeUserInfo = (data, token) => {
    return axios.put('/users/api/updateUserInfo', data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const handleChangePassword = (data, token) =>
    axios.put('/users/api/updateUserPassword', data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const getDetailNotificationFeed = (token) =>
    axios.get(`/users/api/getDetailNotificationFeed`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const getDetailNotificationActivity = (token) =>
    axios.get(`/users/api/getDetailNotificationActivity`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const getDetailNotificationOffer = (token) =>
    axios.get(`/users/api/getDetailNotificationOffer`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const handleAddAnAddress = (data, token) =>
    axios.post(`/users/api/addAnAddress`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const handleUpdateAnAddress = (data, token) =>
    axios.put(`/users/api/updateAddress`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const handleGetUserAddress = (userId, token) =>
    axios.get(`/users/api/getUserAddress?userId=${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const handleGetUserAddressById = (addressId, token) =>
    axios.get(`/users/api/getUserAddressById?addressId=${addressId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const handleDeleteAddress = (addressId, token) =>
    axios.delete(`/users/api/deleteAnAddress?addressId=${addressId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const handleOrder = (data, token) =>
    axios.post(`/users/api/order`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

export const handleGetNewToken = async (data) => {
    const res = await axios.post('/refreshToken', data)
    if (res)
        return res.errCode === 0 ?
            res.accessToken :
            USER_ACTION_INTERFACE.FAIL
    else
        return USER_ACTION_INTERFACE.FAIL
}