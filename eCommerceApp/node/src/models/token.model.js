import { model, Schema, Types } from 'mongoose';

const TokenSchema = new Schema({
    _id: Types.ObjectId,
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    listToken: [{
        type: String
    }]
}, { timestamps: true });

const TokenModel = model('Token', TokenSchema);

export default TokenModel;