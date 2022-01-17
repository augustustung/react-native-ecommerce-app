import { model, Schema, Types } from 'mongoose';

const OrderSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        required: true
    },
    userId: {
        type: Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    productId: [{
        type: Types.ObjectId,
        ref: "Product"
    }],
    orderAt: {
        type: String,
        required: true,
        default: "January 1, 1990"
    },
    dateShipping: {
        type: String,
        required: true
    },
    shipping: {
        type: String,
        required: true
    },
    resi: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    sumProduct: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        required: true
    },
    charge: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    orderCode: {
        type: String,
        required: true
    }
}, { timestamps: true });

const OrderModel = model('Order', OrderSchema);

export default OrderModel;