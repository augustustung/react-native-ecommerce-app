import { model, Schema, Types } from 'mongoose';

const CuponCodeSchema = new Schema({
    _id: Types.ObjectId,
    code: String
}, { timestamps: true });

const CuponCodeModel = model('CuponCode', CuponCodeSchema);

export default CuponCodeModel;