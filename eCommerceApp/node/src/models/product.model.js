import { model, Schema, Types } from 'mongoose';

const ProductSchema = new Schema({
    _id: Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    image: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    selectSize: [
        {
            _id: Types.ObjectId,
            label: String,
            color: [{
                _id: Types.ObjectId,
                quantity: Number,
                color: String
            }]
        }
    ],
    specification: {
        shown: String,
        style: String,
        description: String
    },
    reviewProduct: [
        {
            _id: Types.ObjectId,
            firstName: String,
            lastName: String,
            avatar: String,
            star: Number,
            content: String,
            time: String,
            image: Array
        }
    ],
    saleOff: {
        type: Number,
        required: true
    },
    isSupperFlashSale: Boolean,
    isFlashSale: Boolean,
    isMegaSale: Boolean,
    recommendFor: [
        { type: Types.ObjectId, ref: "User" }
    ]
    //auto create 2 fields createdAt and updatedAte
}, { timestamps: true });

const ProductModel = model('Product', ProductSchema);

export default ProductModel;