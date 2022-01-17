import FavoriteModel from "../models/favorite.model";
import ProductModel from "../models/product.model";
import UserModel from "../models/user.model";

const handleGetTopProductsFlashSaleService = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await ProductModel.find({
                isFlashSale: true
            }).limit(+limit).exec();

            resolve({
                errCode: 0,
                data: products.length > 0 ? products : []
            });

        } catch (e) {
            reject(e);
        }
    })
}

const handleGetTopProductsMegaSaleService = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await ProductModel.find({
                isMegaSale: true
            }).limit(+limit).exec();

            resolve({
                errCode: 0,
                data: products.length > 0 ? products : []
            })
        } catch (e) {
            reject(e);
        }
    })
}

const handleGetProductsSuperFlashSaleService = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = [];
            if (limit === "ALL") {
                products = await ProductModel.find({
                    isSupperFlashSale: true
                }).exec();
            } else if (typeof +limit === "number") {
                products = await ProductModel.find({
                    isSupperFlashSale: true
                }).limit(+limit).exec();
            } else {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter!"
                })
            }

            resolve({
                errCode: 0,
                data: products.length > 0 ? products : []
            })

        } catch (e) {
            reject(e);
        }
    })
}

const handleGetProductByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await ProductModel.findOne({
                _id: id
            }).exec();

            if (product)
                resolve({
                    errCode: 0,
                    data: product
                });
            else
                resolve({
                    errCode: 2,
                    errMessage: "Product not found!"
                });

        } catch (e) {
            reject(e);
        }
    })
}

const handleGetRecommendProducts = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await ProductModel.find();
            let result = products.filter(item =>
                item.recommendFor.find(uuid =>
                    uuid._id.toString() === userId.toString()
                )
            );

            if (result.length > 0)
                resolve({
                    errCode: 0,
                    data: result
                })
            else
                resolve({
                    errCode: 2,
                    errMessage: "Product not found!"
                })

        } catch (e) {
            reject(e)
        }
    })
}

const handleGetFavoriteProducts = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })

            const wishlist = await FavoriteModel.findOne({
                userId: userId
            }).populate('listProductId');
            resolve({
                errCode: 0,
                data: wishlist && wishlist.listProductId && wishlist.listProductId.length > 0 ? wishlist.listProductId : []
            })
        } catch (e) {
            reject(e)
        }
    })
}

const handleSearchProduct = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!text)
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })

            const product = await ProductModel.find({
                name: { $regex: text }
            }).exec();

            if (product && product.length > 0)
                resolve({
                    errCode: 0,
                    data: product
                })
            else
                resolve({
                    errCode: 2,
                    errMessage: "Product not found!"
                })

        } catch (e) {
            reject(e)
        }
    })
}

export default {
    handleGetTopProductsFlashSaleService,
    handleGetTopProductsMegaSaleService,
    handleGetProductsSuperFlashSaleService,
    handleGetProductByIdService,
    handleGetRecommendProducts,
    handleGetFavoriteProducts,
    handleSearchProduct
}
