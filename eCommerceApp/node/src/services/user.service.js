import UserModel from '../models/user.model';
import ProductModel from '../models/product.model';
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import AllcodeModel from '../models/allcode.model';
import CartModel from '../models/cart.model';
import FeedModel from '../models/feed.model';
import ActivityModel from '../models/activity.model';
import OfferModel from '../models/offer.model';
import OrderModel from '../models/order.model';
import CuponCodeModel from '../models/cuponCode.model';
import FavoriteModel from '../models/favorite.model';
import AddressModel from '../models/address.model';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import TokenModel from '../models/token.model';

var salt = bcrypt.genSaltSync(10);

const checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await UserModel.findOne({
                email: userEmail
            }).exec();

            if (user)
                resolve(user);
            else
                resolve(false);
        } catch (err) {
            reject(err);
        }
    })
}

const handleSignInService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await checkEmail(email);
            //if user is exit, then compare password
            if (user) {
                let check = await bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0;
                    userData.message = "ok";
                    user.password = undefined;
                    userData.user = user;

                    //create token
                    const accessToken = jwt.sign(
                        { email: email },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30m' }
                    );
                    //refresh token
                    const refreshToken = jwt.sign(
                        { email: email },
                        process.env.REFRESH_TOKEN_SECRET
                    );
                    const refTokenStore = await TokenModel.findOne({ userId: user._id });
                    refTokenStore.listToken.push(refreshToken);
                    await refTokenStore.save();
                    userData.accessToken = accessToken;
                    userData.refreshToken = refreshToken;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = "Wrong password!";
                }

            } else {
                userData.errCode = 2;
                userData.errMessage = "User's not found!";
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

const handleSignUpService = (fullName, email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await checkEmail(email);
            if (check)
                resolve({
                    errCode: 1,
                    errMessage: "Email is used! Please try another..."
                });
            else {
                const hashPassword = _onHashPassword(password);
                const generateNewId = new mongoose.Types.ObjectId;

                const feed = await FeedModel.find();
                const activity = await ActivityModel.find();
                const offer = await OfferModel.find();
                //create and add some new notification
                const newUser = new UserModel({
                    _id: generateNewId,
                    fullName: fullName,
                    email: email,
                    avatar: "https://imgt.taimienphi.vn/cf/Images/tt/2021/8/17/hinh-nen-vit-avatar-anh-vit-cute-ngoc-nghech-39.jpg",
                    password: hashPassword,
                    notification: {
                        offer: offer && offer.length > 0 ? offer : [],
                        activity: activity && activity.length > 0 ? activity : [],
                        feed: feed && feed.length > 0 ? feed : []
                    },
                    payment: {
                        credit: [
                            {
                                id: "834hasdjfhajf" + Math.round(Math.random() * 100),
                                cardNumber: "6326-9124-8124-9875",
                                cardHolder: "Lailyfa Febrina",
                                cardSave: "19/2042"
                            },
                            {
                                id: "834hasdjfhajf" + Math.round(Math.random() * 100),
                                cardNumber: "2222-2222-2222-2222",
                                cardHolder: "asdasdasdasdsad",
                                cardSave: "19/4042"
                            }
                        ],
                        paypal: [
                            {
                                id: 'sadasdasd323223432',
                                cardNumber: "6326-9124-8124-9875",
                                cardHolder: "Lailyfa Febrina",
                                cardSave: "19/2042"
                            }
                        ],
                        bank: []
                    }
                });

                await newUser.save();

                //create refresh token store
                const tokens = new TokenModel({
                    _id: new mongoose.Types.ObjectId,
                    userId: generateNewId,
                    listToken: []
                });

                await tokens.save();

                //create wishlist for user
                const wishlist = new FavoriteModel({
                    _id: new mongoose.Types.ObjectId,
                    userId: generateNewId,
                    listProductId: [],
                    quantity: []
                });
                await wishlist.save();

                //create cart for user
                const cart = new CartModel({
                    _id: new mongoose.Types.ObjectId,
                    userId: generateNewId,
                    quantity: 0,
                    listProductId: []
                });

                await cart.save();

                //recommend some products
                await ProductModel.count().exec(async (err, count) => {
                    for (let i = 0; i < 2; i++) {
                        let random = Math.floor(Math.random() * (count - 2));
                        const product = await ProductModel.findOne().skip(random).exec();
                        product.recommendFor.push(generateNewId._id);
                        await product.save()
                    }
                });

                //add a fake order
                const order = await OrderModel.findOne();
                order.userId = generateNewId;
                await order.save();

                resolve({
                    errCode: 0,
                    data: newUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleSignOut = (userId) => {
    //delete refresh token userid
    return new Promise(async (resolve, reject) => {
        if (!userId)
            resolve({
                errCode: -1,
                errMessage: "Missing required pa"
            });

        const refTokenStore = await TokenModel.findOne({ userId: userId });
        refTokenStore.listToken = [];
        await refTokenStore.save();

        resolve({
            errCode: 0,
            message: "OK"
        });
    })

}

const _onHashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const handleGetAllcodeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await AllcodeModel.find({ type: type }).exec();
            if (data && data.length > 0)
                resolve({
                    errCode: 0,
                    data: data
                })
            else
                resolve({
                    errCode: 2,
                    errMessage: "Type not found!"
                })
        } catch (e) {
            reject(e);
        }
    })
}

const handleGetDataCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                });

            const cart = await CartModel.findOne(
                { userId: userId }
            ).exec();

            resolve({
                errCode: 0,
                data: cart && cart.listProduct && cart.listProduct.length > 0 ? cart.listProduct : []
            });
        } catch (e) {
            reject(e);
        }
    })
}

const handleChangeCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                userId,
                actions,
                productId,
                productName,
                productImage,
                selectedSize,
                selectedColor,
                price
            } = data

            if (!userId || !productId || !actions)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                });

            const item = await CartModel.findOne({
                userId: userId
            }).exec();

            if (!item)
                resolve({
                    errCode: 2,
                    errMessage: "Cart Not Found."
                });

            //increasing quantity
            if (actions === "ADD") {
                //check if exists
                const isExists = await item.listProduct.findIndex(obj => obj.productId.toString() === productId);
                if (isExists > -1) {
                    item.listProduct[isExists].quantity += 1;
                    resolve({
                        errCode: 0,
                        message: "Added To Cart."
                    });
                }
                else {
                    item.listProduct.push({
                        productId: productId,
                        productName: productName,
                        productImage: productImage,
                        selectedSize: selectedSize,
                        selectedColor: selectedColor,
                        quantity: 1,
                        price: price
                    });
                }
                await item.save();

                resolve({
                    errCode: 0,
                    message: "Added To Cart!"
                });
            }
            // delete item
            else {
                item.listProduct = await item.listProduct.filter(obj => obj.productId.toString() !== productId);

                await item.save();
                resolve({
                    errCode: 0,
                    message: "Removed From Cart!"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

const handleChangeQuantity = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                userId,
                actions,
                productId
            } = data

            if (!userId || !productId || !actions)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                });

            const item = await CartModel.findOne({
                userId: userId
            })

            if (!item)
                resolve({
                    errCode: 2,
                    errMessage: "Cart Not Found."
                });

            let index = await item.listProduct.findIndex(obj => obj.productId.toString() === productId);
            //increasing quantity
            if (actions === "INCREASING")
                item.listProduct[index].quantity += 1;
            else {
                //if quantity = 1 focus decreasing => delete
                if (item.listProduct[index].quantity === 1) {
                    item.listProduct = await item.listProduct.filter(obj => obj.productId.toString() !== productId);
                    await item.save();
                    resolve({
                        errCode: 0,
                        message: "Removed From Cart."
                    });
                } else {
                    //decreasing
                    item.listProduct[index].quantity -= 1;
                }
            }

            await item.save();
            resolve({
                errCode: 0,
                message: "Changed !"
            });


        } catch (e) {
            reject(e)
        }
    })
}

const handleChangeFavorite = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                userId,
                itemId,
                actions
            } = data

            if (!userId || !itemId || !actions)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                });

            const userWishlist = await FavoriteModel.findOne({
                userId: userId
            });

            if (userWishlist) {
                if (actions === "ADD") {
                    userWishlist.listProductId.push(itemId);
                    await userWishlist.save();
                    resolve({
                        errCode: 0,
                        message: "Added To Favorite!"
                    });
                }
                else {
                    userWishlist.listProductId = userWishlist.listProductId.filter(item =>
                        item._id.toString() !== itemId
                    );

                    await userWishlist.save();
                    resolve({
                        errCode: 0,
                        message: "Removed From Favorite!"
                    });
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "User Not Found."
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleChangeUserInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            const user = await UserModel.findOneAndUpdate(
                { _id: data._id },
                data,
                { new: true }
            );

            if (user) {
                resolve({
                    errCode: 0,
                    data: user
                })
            } else {
                reject({
                    errCode: 1,
                    errMessage: "User Not Found."
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleUpdateUserPassword = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                userId,
                oldPass,
                newPass
            } = data
            if (!userId || !newPass || !oldPass)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                });

            const user = await UserModel.findOne({ _id: userId });

            if (user) {
                const check = await bcrypt.compareSync(oldPass, user.password);
                if (!check)
                    resolve({
                        errCode: 2,
                        errMessage: "Oops! Your Password Is Not Correct"
                    });

                else {
                    const hashPassword = _onHashPassword(newPass);
                    user.password = hashPassword;
                    await user.save();
                    resolve({
                        errCode: 0,
                        message: "Updated User Password!"
                    })
                }
            } else {
                reject({
                    errCode: 3,
                    errMessage: "User Not Found."
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleGetOrders = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                });
            const allcodeShipping = await handleGetAllcodeService("SHIPPING");
            const order = await OrderModel.find(
                { userId: userId }
            ).exec();

            if (order && order.length > 0) {
                resolve({
                    errCode: 0,
                    data: order,
                    allcodeShipping: allcodeShipping.data
                });
            } else {
                reject({
                    errCode: 1,
                    errMessage: "Order Not Found."
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

const handleGetOrderById = (orderCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!orderCode)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                });

            const order = await OrderModel.findOne({ _id: orderCode }).populate("productId").exec();
            if (order && order.status) {
                resolve({
                    errCode: 0,
                    data: order
                });
            } else {
                reject({
                    errCode: 2,
                    errMessage: "Order Not Found."
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

const handleApplyCuponCode = (codeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!codeInput)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })

            const code = await CuponCodeModel.findOne({
                code: codeInput
            }).exec();

            if (code)
                resolve({
                    errCode: 0,
                    message: "Applied Code!"
                })
            else
                resolve({
                    errCode: 2,
                    errMessage: "Cupon Code Not Found."
                })
        } catch (e) {
            reject(e);
        }
    });
}

const handleGetDetailNotificationFeed = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await FeedModel.find();

            resolve({
                errCode: 0,
                data: data && data.length > 0 ? data : []
            })
        } catch (e) {
            reject(e);
        }
    });
}

const handleGetDetailNotificationActivity = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await ActivityModel.find();

            resolve({
                errCode: 0,
                data: data && data.length > 0 ? data : []
            })
        } catch (e) {
            reject(e);
        }
    });
}

const handleGetDetailNotificationOffer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await OfferModel.find();

            resolve({
                errCode: 0,
                data: data && data.length > 0 ? data : []
            })
        } catch (e) {
            reject(e);
        }
    });
}

const handleAddAnAdress = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //nhường validate cho front-end @@
            const address = new AddressModel({
                _id: new mongoose.Types.ObjectId,
                ...data,
            });

            await address.save();

            resolve({
                errCode: 0,
                message: "Create New Address Succeed!"
            });
        } catch (e) {
            reject(e);
        }
    })
}

const handleUpdateAnAddress = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //nhường validate cho front-end @@
            const address = await AddressModel.findOneAndUpdate(
                { _id: data._id },
                data,
                { new: true }
            );

            if (address)
                resolve({
                    errCode: 0,
                    message: "Update Address Succeed!"
                });
            else
                resolve({
                    errCode: 1,
                    errMessage: "Address Not Found."
                })

        } catch (e) {
            reject(e);
        }
    })
}

const handleGetUserAddress = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                });

            const address = await AddressModel.find({ userId: userId });

            resolve({
                errCode: 0,
                data: address && address.length > 0 ? address : []
            });

        } catch (e) {
            reject(e);
        }
    })
}

const handleGetUserAddressById = (addressId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!addressId)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                });

            const address = await AddressModel.findOne({ _id: addressId });

            resolve({
                errCode: 0,
                data: address ? address : {}
            });

        } catch (e) {
            reject(e);
        }
    })
}

const handleDeleteAnAddress = (addressId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!addressId)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                });

            const address = await AddressModel.findOne({ _id: addressId });

            if (address) {
                await address.remove();
                resolve({
                    errCode: 0,
                    message: "Deleted Address!"
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Address Not Found."
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

const handleOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId } = data;
            if (!userId)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                });

            const cart = await CartModel.findOne({
                userId: userId
            });

            if (cart) {
                cart.listProduct = []
                await cart.save();
                resolve({
                    errCode: 0,
                    message: "Order Succeed!"
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Order Failed!"
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}

export default {
    handleSignInService,
    handleSignUpService,
    handleSignOut,
    handleGetAllcodeService,
    handleChangeCart,
    handleChangeQuantity,
    handleChangeFavorite,
    handleChangeUserInfo,
    handleUpdateUserPassword,
    handleGetOrders,
    handleGetOrderById,
    handleApplyCuponCode,
    handleGetDetailNotificationFeed,
    handleGetDetailNotificationActivity,
    handleGetDetailNotificationOffer,
    handleGetDataCart,
    handleAddAnAdress,
    handleUpdateAnAddress,
    handleGetUserAddress,
    handleGetUserAddressById,
    handleDeleteAnAddress,
    handleOrder
}