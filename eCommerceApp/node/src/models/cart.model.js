import { model, Schema, Types } from 'mongoose';

const CartSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    listProduct: [{
        productId: Types.ObjectId,
        productName: String,
        productImage: String,
        selectedSize: Number,
        selectedColor: String,
        quantity: Number,
        price: Number
    }]
}, { timestamps: true });

const CartModel = model('Cart', CartSchema);

export default CartModel;