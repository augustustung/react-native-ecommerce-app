import { model, Schema, Types } from 'mongoose';

const FavoriteSchema = new Schema({
    _id: Types.ObjectId,
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    listProductId: [{
        type: Types.ObjectId,
        ref: "Product"
    }]
}, { timestamps: true });

const FavoriteModel = model('Favorite', FavoriteSchema);

export default FavoriteModel;