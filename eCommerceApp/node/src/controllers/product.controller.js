import productService from '../services/product.service'

const _onGetTopProductsFlashSale = async (req, res) => {
    let { limit } = req.query
    if (!limit || limit < 0)
        limit = 8;

    try {
        let data = await productService.handleGetTopProductsFlashSaleService(limit);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

const _onGetTopProductsMegaSale = async (req, res) => {
    let { limit } = req.query
    if (!limit || limit < 0)
        limit = 8;
    try {
        let data = await productService.handleGetTopProductsMegaSaleService(limit);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

const _onGetProductsSuperFlashSale = async (req, res) => {
    try {
        let data = await productService.handleGetProductsSuperFlashSaleService(req.query.limit);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

const _onGetProductById = async (req, res) => {
    try {
        let data = await productService.handleGetProductByIdService(req.query.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

const _onGetProductRecommend = async (req, res) => {
    try {
        let data = await productService.handleGetRecommendProducts(req.query.userId);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

const _onGetFavoriteProducts = async (req, res) => {
    try {
        let message = await productService.handleGetFavoriteProducts(req.query.userId);
        return res.status(200).json(message)
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

const _onSearchProduct = async (req, res) => {
    try {
        let data = await productService.handleSearchProduct(req.query.name);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

export default {
    _onGetTopProductsFlashSale,
    _onGetTopProductsMegaSale,
    _onGetProductsSuperFlashSale,
    _onGetProductById,
    _onGetProductRecommend,
    _onGetFavoriteProducts,
    _onSearchProduct
}