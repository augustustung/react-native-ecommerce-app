import userService from '../services/user.service'

const _onSignIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter!"
        })

    let userData = await userService.handleSignInService(email, password)
    return res.status(200).json(userData)
}

const _onSignUp = async (req, res) => {
    const { fullName, email, password } = req.body
    if (!fullName || !email || !password)
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter!"
        })

    let message = await userService.handleSignUpService(fullName, email, password)
    return res.status(200).json(message)
}

const _onLogOut = async (req, res) => {
    let message = await userService.handleSignOut(req.query.userId)
    return res.status(200).json(message)
}

const _onGetAllcode = async (req, res) => {
    try {
        const message = await userService.handleGetAllcodeService(req.query.type)
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onChangeCart = async (req, res) => {
    try {
        const message = await userService.handleChangeCart(req.body)
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onChangeQuantity = async (req, res) => {
    try {
        const message = await userService.handleChangeQuantity(req.body)
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onChangeFavorite = async (req, res) => {
    try {
        const message = await userService.handleChangeFavorite(req.body)
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onUpdateUserInfo = async (req, res) => {
    try {
        const message = await userService.handleChangeUserInfo(req.body)
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onChangePassword = async (req, res) => {
    try {
        const message = await userService.handleUpdateUserPassword(req.body)
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onGetUserOrders = async (req, res) => {
    try {
        const message = await userService.handleGetOrders(req.query.userId)
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onGetOrderById = async (req, res) => {
    try {
        const message = await userService.handleGetOrderById(req.query.orderCode)
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onApplyCuponCode = async (req, res) => {
    try {
        const message = await userService.handleApplyCuponCode(req.query.cuponcode)
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onGetDetailNotificationFeed = async (req, res) => {
    try {
        const message = await userService.handleGetDetailNotificationFeed()
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onGetDetailNotificationActivity = async (req, res) => {
    try {
        const message = await userService.handleGetDetailNotificationActivity()
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onGetDetailNotificationOffer = async (req, res) => {
    try {
        const message = await userService.handleGetDetailNotificationOffer()
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onGetDataCart = async (req, res) => {
    try {
        const data = await userService.handleGetDataCart(req.query.userId)
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onAddAnAddress = async (req, res) => {
    try {
        const message = await userService.handleAddAnAdress(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onUpdateAnAddress = async (req, res) => {
    try {
        const message = await userService.handleUpdateAnAddress(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onGetUserAddress = async (req, res) => {
    try {
        const data = await userService.handleGetUserAddress(req.query.userId);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onGetUserAddressById = async (req, res) => {
    try {
        const data = await userService.handleGetUserAddressById(req.query.addressId);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onDeleteAnAdress = async (req, res) => {
    try {
        const data = await userService.handleDeleteAnAddress(req.query.addressId);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

const _onOrder = async (req, res) => {
    try {
        const data = await userService.handleOrder(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        });
    }
}

export default {
    _onSignIn,
    _onSignUp,
    _onLogOut,
    _onGetAllcode,
    _onChangeCart,
    _onChangeQuantity,
    _onChangeFavorite,
    _onUpdateUserInfo,
    _onChangePassword,
    _onGetUserOrders,
    _onGetOrderById,
    _onApplyCuponCode,
    _onGetDetailNotificationFeed,
    _onGetDetailNotificationActivity,
    _onGetDetailNotificationOffer,
    _onGetDataCart,
    _onAddAnAddress,
    _onUpdateAnAddress,
    _onGetUserAddress,
    _onGetUserAddressById,
    _onDeleteAnAdress,
    _onOrder
};